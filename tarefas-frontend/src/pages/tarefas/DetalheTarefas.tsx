import React, { useEffect, useState } from 'react';
import {Box, Button, Grid, LinearProgress, Paper, Typography} from '@mui/material';
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';
import * as yup from 'yup';

import { TarefasService } from '../../shared/services/api/tarefas/TarefasService';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';

import { LayoutBase } from '../../shared/layouts';
import {FerramentasDeDetalhe} from "../../shared/components";
import {Form} from "@unform/web";
import {MqttApi} from "../../mqtt/MqttApi";
import mqtt from "mqtt";
import {RedisService} from "../../shared/services/api/redis/RedisService";


interface IFormData {
    name: string;
    weight?: number;
    description?: string;
    type: string;
}
const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    name: yup.string().required(),
    weight: yup.number().optional(),
    description: yup.string(),
    type: yup.string().required(),
});

export const DetalheTarefas: React.FC = () => {
    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
    const { name = 'cadastrar' } = useParams<'name'>();
    const { id = null} = useParams<'id'>();
    const navigate = useNavigate();


    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [peso, setPeso] = useState('');
    const [usuario, setUsuario] = useState('');

    useEffect(() => {

        const user = localStorage.getItem("APP_USER") || '';
        setUsuario(user);
        if (name !== 'cadastrar') {
            RedisService.get({key: user+"_editar_tarefa_"+id+"_bloqueado"}).then((result) =>
            {
                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/tarefas');
                }else {
                    const bool = (/true/i).test(result);
                    if(bool){
                        handleGetMessage(user+"_editar_tarefa_"+id+"_bloqueado");
                        setIsLoading(true);
                        alert("Esta tarefa está sendo editada em outro dispositivo");
                    }else{
                        setIsLoading(true);
                        TarefasService.getById(Number(id))
                            .then((result) => {
                                setIsLoading(false);

                                if (result instanceof Error) {
                                    alert(result.message);
                                    navigate('/tarefas');
                                } else {
                                    setNome(result.name);
                                    formRef.current?.setData(result);
                                }
                            });
                    }
                }

            })

        } else {
            formRef.current?.setData({
                name: '',
                description: '',
                weight: undefined,
                type: '',
            });
        }
    }, [name]);

    const handleMessage = () => {
        const user = localStorage.getItem("APP_USER");
        const tarefa = {
            data:{
                name: nome,
                type: tipo,
                weight: Number(peso),
                description: descricao,
            },
            key: user + "_editar_tarefa_"+id


        }
        console.log("publish");
        const client = MqttApi.connect();
        client.on('connect', () => {
            console.log("connected");
            client.publish("cadastro-tarefa", JSON.stringify(tarefa))
            client.end();
        })


    }
    const handleGetMessage = (topic: string) => {
        const client = MqttApi.connect();
        client.on('connect', () => {
            console.log("connected");
            const cli = client.subscribe(topic,{
                qos: 0,
                rap: false,
                rh: 0,
            }, (error) => {
                if (error) {
                    console.log('MQTT Subscribe to topics error', error);
                    return;
                }
            });
        })
        client.on('message', (topic, payload, packet) => {
            const user = localStorage.getItem("APP_USER") || '';
            console.log(user+"_editar_tarefa_"+id+"_bloqueado")
            if(topic.toString() === user+"_editar_tarefa_"+id+"_bloqueado"){
                RedisService.get({key:user+"_editar_tarefa_"+id}).then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/tarefas');
                    }else{

                        const data: IFormData = JSON.parse(JSON.stringify(result));
                        setNome(data.name);
                        formRef.current?.setData(data);
                    }
                })
                setIsLoading(false);
            }else if(topic === user+"_editar_tarefa_"+id){
                const data:IFormData = JSON.parse(payload.toString());
                formRef.current?.setData(data);
            }
            // console.log(topic)
            // console.log(payload.toString());
        })

    }
    const handleSave = (dados: IFormData) => {
        formValidationSchema.
        validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                setIsLoading(true);

                if (name === 'cadastrar') {
                    TarefasService
                        .create(dadosValidados)
                        .then((result) => {
                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/tarefas');
                                } else {
                                    console.log(result);
                                    navigate(`/tarefas/detalhe/editar/${result}`);
                                }
                            }
                        });
                } else {
                    TarefasService
                        .updateById(Number(id), { id: Number(id), ...dadosValidados })
                        .then((result) => {
                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/tarefas');
                                }
                            }
                        });
                }
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: IVFormErrors = {};

                errors.inner.forEach(error => {
                    if (!error.path) return;

                    validationErrors[error.path] = error.message;
                });

                formRef.current?.setErrors(validationErrors);
            });
    };

    const handleDelete = (id: number) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Realmente deseja apagar?')) {
            TarefasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Registro apagado com sucesso!');
                        navigate('/pessoas');
                    }
                });
        }
    };


    return (
        <LayoutBase
            titulo={name === 'cadastrar' ? 'Cadastrar tarefa' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo='Cadastrar'
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={name !== 'cadastrar'}
                    mostrarBotaoApagar={name !== 'cadastrar'}

                    aoClicarEmSalvar={save}
                    aoClicarEmSalvarEFechar={saveAndClose}
                    aoClicarEmVoltar={() => navigate('/tarefas')}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navigate('/tarefas/detalhe/cadastrar')}
                />
            }
        >
            <VForm ref={formRef} onSubmit={handleSave} placeholder={formRef}>
                <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">

                    <Grid container direction="column" padding={2} spacing={2}>

                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant='indeterminate' />
                            </Grid>
                        )}

                        <Grid item>
                            <Typography variant='h6'>Geral</Typography>
                        </Grid>

                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    name='name'
                                    disabled={isLoading}
                                    label='Nome'
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    name='type'
                                    label='Tipo de Tarefa'
                                    disabled={isLoading}
                                    onChange={e => setTipo(e.target.value)}

                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    type="number"
                                    fullWidth
                                    name='weight'
                                    label='Peso da Tarefa'
                                    disabled={isLoading}
                                    onChange={e => setPeso(e.target.value)}

                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    name='description'
                                    label='Descrição'
                                    disabled={isLoading}
                                    onChange={e => setDescricao(e.target.value)}

                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <Button onClick={()=>handleMessage()}>Rascunho</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </VForm>
        </LayoutBase>
    );
};
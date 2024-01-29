import React, { useEffect, useState } from 'react';
import {Box, Button, Grid, LinearProgress, Paper, Typography} from '@mui/material';
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';
import * as yup from 'yup';

import { TarefasService } from '../../shared/services/api/tarefas/TarefasService';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';

import { LayoutBase } from '../../shared/layouts';
import {FerramentasDeDetalhe} from "../../shared/components";
import {Form} from "@unform/web";


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

    useEffect(() => {
        console.log(id);
        if (name !== 'cadastrar') {
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
        } else {
            formRef.current?.setData({
                name: '',
                description: '',
                weight: undefined,
                type: '',
            });
        }
    }, [name]);


    const handleSave = (dados: IFormData) => {
        console.log(dados)
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
                                    navigate(`/tarefas/detalhe/${result}`);
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
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    name='weight'
                                    label='Peso da Tarefa'
                                    disabled={isLoading}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    name='description'
                                    label='Descrição'
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </VForm>
        </LayoutBase>
    );
};
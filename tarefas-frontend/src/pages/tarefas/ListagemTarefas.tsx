import {LayoutBase} from "../../shared/layouts";
import React, {useEffect, useState} from "react";
import {IListagemTarefa, TarefasService} from "../../shared/services/api/tarefas/TarefasService";
import {
    Box,
    Button,
    Card, CardActions,
    CardContent,
    Grid, Icon, LinearProgress,
    Paper,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import {BarraDeFerramentas} from "../../shared/components";
import {useNavigate} from "react-router-dom";


export const ListagemTarefas : React.FC = () => {
    const [rows,setRows] = useState<IListagemTarefa[]>([]);
    const [isLoading,setIsLoading] = useState(true);
    const navigate = useNavigate();
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        setIsLoading(true);
        TarefasService.getAll().then((result) => {
            setIsLoading(false)
            if(result instanceof Error){
                alert(result.message)
            }else{
                console.log(result)
                setRows(result)
            }
        })

    },[])
    const handleDelete = (id: number) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Realmente deseja apagar?')) {
            TarefasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Registro apagado com sucesso!');
                        window.location.reload();
                        //navigate('/tarefas');
                    }
                });
        }
    };
    return (
        <LayoutBase
            titulo='Listagem de Tarefas'
            barraDeFerramentas={
                <BarraDeFerramentas textoBotaoNovo='Cadastar'
                                    mostrarBotaoNovo
                                    aoClicarEmNovo={() => navigate('/tarefas/detalhe/cadastrar')}  />
            }
        >
            <Box margin={1} display="flex" flexDirection="row" component={Paper} variant="outlined" sx={{m:1 , width:'auto'}}>
                <Grid container direction="column" padding={2} spacing={2}>
                {isLoading && (
                    <Grid item>
                        <LinearProgress variant='indeterminate' />
                    </Grid>
                )}
                <Grid container
                      direction="row"
                      padding={2}
                      spacing={2}
                      alignItems="flex-start"
                >
                    {rows.map(row => (
                        <Grid key={row.id} item  xs={12} sm={12} md={6} lg={4} xl={2}>
                            <Card >
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {row.name}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        {row.type}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {row.weight}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => navigate('/tarefas/detalhe/editar/' + row.id)}>{smDown? <Icon>edit</Icon> : 'Editar'}</Button>
                                    <Button size="small" onClick={() => handleDelete(row.id)}>{smDown? <Icon>delete</Icon> : 'Remover'}</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                </Grid>
            </Box>
        </LayoutBase>
    )
}
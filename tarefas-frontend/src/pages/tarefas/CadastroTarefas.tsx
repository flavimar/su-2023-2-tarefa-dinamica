import {LayoutBase} from "../../shared/layouts";
import {Box, Button, Grid, TextField} from "@mui/material";

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
};

export const CadastroTarefas : React.FC = () => {
    return (
        <LayoutBase titulo='Cadastrar Tarefa'>
            <Box
                sx={{
                    margin: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}

                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Nome da tarefa"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="type"
                                label="Tipo"
                                name="type"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="weigth"
                                label="Peso"
                                name="weigth"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="description"
                                id="ds_tarefa"
                                label="description"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Cadastrar
                    </Button>
                </Box>
            </Box>
        </LayoutBase>
    );
}
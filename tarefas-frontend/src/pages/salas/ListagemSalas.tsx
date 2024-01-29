import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {LayoutBase} from "../../shared/layouts";
import {BarraDeFerramentas} from "../../shared/components";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {IListagemSala, SalasService} from "../../shared/services/api/salas/SalasService";

export const ListagemSalas : React.FC = () => {
    const [rows,setRows] = useState<IListagemSala[]>([]);
    const [isLoading,setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        SalasService.getAll().then((result) => {
            setIsLoading(false)
            if(result instanceof Error){
                alert(result.message)
            }else{
                console.log(result)
                setRows(result)
            }
        })

    },[])
    return (
        <LayoutBase
            titulo='Listagem de Salas'
            barraDeFerramentas={
                <BarraDeFerramentas textoBotaoNovo='Cadastar'
                                    mostrarBotaoNovo
                                    aoClicarEmNovo={() => navigate('/salas/detalhe/cadastrar')}  />
            }
        >
            <TableContainer component={Paper} variant="outlined" sx={{m:1 , width:'auto'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Nome
                            </TableCell>
                            <TableCell>
                                Descrição
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    {row.name}
                                </TableCell>
                                <TableCell>
                                    {row.description}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </LayoutBase>
    )
}
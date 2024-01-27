import {LayoutBase} from "../../shared/layouts";
import {useEffect, useState} from "react";
import {IListagemTarefa, TarefasService} from "../../shared/services/api/tarefas/TarefasService";
import {debounce, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";


export const ListagemTarefas : React.FC = () => {
    const [rows,setRows] = useState<IListagemTarefa[]>([]);
    const [isLoading,setIsLoading] = useState(true);


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
    return (
        <LayoutBase titulo='Listagem de Tarefas'>
            <TableContainer component={Paper} variant="outlined" sx={{m:1 , width:'auto'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Nome
                            </TableCell>
                            <TableCell>
                                Peso
                            </TableCell>
                            <TableCell>
                                Tipo
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
                                        {row.weigth}
                                    </TableCell>
                                    <TableCell>
                                        {row.type}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                </Table>
            </TableContainer>
        </LayoutBase>
    )
}
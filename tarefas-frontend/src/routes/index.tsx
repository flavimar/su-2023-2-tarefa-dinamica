import {Routes, Route, Navigate} from "react-router-dom";
import {useDrawerContext} from "../shared/contexts";
import {useEffect} from "react";
import {Dashboard, ListagemTarefas} from "../pages";

export const AppRoutes = () => {
    const {setDrawerOptions} = useDrawerContext();
    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'home',
                path: '/pagina-inicial',
                label: 'Página inicial',
            },
            {
                icon: 'task',
                path: '/task',
                label: 'Tarefas',
            },
        ]);
    }, []);
    return(
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard/>} />
            <Route path="/task" element={<ListagemTarefas/>} />
            <Route path="*" element={<Navigate to="/pagina-inicial" />}/>
        </Routes>
    );
}
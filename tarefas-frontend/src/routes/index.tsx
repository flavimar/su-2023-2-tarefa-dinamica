import {Routes, Route, Navigate} from "react-router-dom";
import {useDrawerContext} from "../shared/contexts";
import {useEffect} from "react";
import {Dashboard, ListagemSalas,ListagemTarefas} from "../pages";
import {DetalheTarefas} from "../pages/tarefas/DetalheTarefas";

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
                path: '/tarefas',
                label: 'Tarefas',
            },
            {
                icon: 'classroom',
                path: '/salas',
                label: 'Salas',
            },
        ]);
    }, []);
    return(
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard/>} />
            <Route path="/tarefas" element={<ListagemTarefas/>} />
            <Route path="/salas" element={<ListagemSalas/>}/>
            <Route path="/tarefas/detalhe/:name" element={<DetalheTarefas/>} />
            <Route path="/tarefas/detalhe/:name/:id" element={<DetalheTarefas/>} />
            <Route path="*" element={<Navigate to="/pagina-inicial" />}/>

        </Routes>
    );
}
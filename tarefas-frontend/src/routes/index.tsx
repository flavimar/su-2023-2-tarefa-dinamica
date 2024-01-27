import {Routes, Route, Navigate} from "react-router-dom";
import {useAppThemeContext, useDrawerContext} from "../shared/contexts";
import {Button} from "@mui/material";

export const AppRoutes = () => {
    const {toggleTheme} = useAppThemeContext();
    const {toggleDrawerOpen} = useDrawerContext();
    return(
        <Routes>
            <Route path="/pagina-inicial" element={<><Button variant='contained' color='primary' onClick={toggleTheme}>tema</Button> <Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Menu</Button></>} />
            <Route path="*" element={<Navigate to="/pagina-inicial" />}/>
        </Routes>
    );
}
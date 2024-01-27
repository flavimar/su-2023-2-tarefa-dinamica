import {
    Box,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {Task} from "@mui/icons-material";
import {useDrawerContext} from "../../contexts";
interface IMenuLateralProps {
    children: React.ReactNode;
}
export const MenuLateral: React.FC<IMenuLateralProps> = ({children}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const {isDrawerOpen,toggleDrawerOpen} = useDrawerContext();
    return (
        <>
        <Drawer open={isDrawerOpen} variant={smDown? 'temporary':'permanent'} onClose={toggleDrawerOpen}>
            <Box width={theme.spacing(28)} display='flex' flexDirection='column' height='100%'>


                <Box flex={1}>
                    <List component="nav">
                        <ListItemButton>
                            <ListItemIcon>
                                <Task/>
                            </ListItemIcon>
                            <ListItemText>
                                Tarefa
                            </ListItemText>
                        </ListItemButton>

                    </List>
                </Box>
            </Box>

        </Drawer>
            <Box height='100vh' marginLeft={smDown? 0 : theme.spacing(28)}>
                {children}
            </Box>

        </>
    )
}
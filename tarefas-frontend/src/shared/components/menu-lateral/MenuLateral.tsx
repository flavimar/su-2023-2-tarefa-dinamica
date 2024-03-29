import {
    Box,
    Drawer, Icon,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {useAppThemeContext, useDrawerContext} from "../../contexts";
import React from "react";
import {useMatch, useNavigate, useResolvedPath} from "react-router-dom";
import {useAuthContext} from "../../contexts/AuthContext";
interface IMenuLateralProps {
    children: React.ReactNode;
}
interface IListItemLinkProps {
    label: string;
    icon: string;
    to:string;
    onClick: (() => void) | undefined;
}
const ListItemLink: React.FC<IListItemLinkProps> = ({label,icon,to,onClick}) => {
    const navigate = useNavigate();
    const resolvedPath = useResolvedPath(to);
    const match = useMatch({path:resolvedPath.pathname,end:false })
    const handleClick = () => {
        navigate(to);
        onClick?.();
    }
    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label}/>
        </ListItemButton>
    )
}
export const MenuLateral: React.FC<IMenuLateralProps> = ({children}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const {isDrawerOpen,toggleDrawerOpen,drawerOptions} = useDrawerContext();
    const { toggleTheme } = useAppThemeContext();
    const { logout } = useAuthContext();

    return (
        <>
        <Drawer open={isDrawerOpen} variant={smDown? 'temporary':'permanent'} onClose={toggleDrawerOpen}>
            <Box width={theme.spacing(28)} display='flex' flexDirection='column' height='100%'>


                <Box flex={1}>
                    <List component="nav">
                        {drawerOptions.map(drawerOption => (
                            <ListItemLink
                                to={drawerOption.path}
                                key={drawerOption.path}
                                icon={drawerOption.icon}
                                label={drawerOption.label}
                                onClick={smDown ? toggleDrawerOpen : undefined}
                            />
                        ))}
                    </List>
                </Box>
                <Box>
                    <List component="nav">
                        <ListItemButton onClick={toggleTheme}>
                            <ListItemIcon>
                                <Icon>dark_mode</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Alternar tema" />
                        </ListItemButton>
                        <ListItemButton onClick={logout}>
                            <ListItemIcon>
                                <Icon>logout</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Sair" />
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
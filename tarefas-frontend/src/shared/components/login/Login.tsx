import {Box, Button, Card, CardActions, CardContent, CardMedia} from '@mui/material';
import {useAuthContext} from "../../contexts/AuthContext";

interface ILoginProps {
    children: React.ReactNode;
}
export const Login: React.FC<ILoginProps> = ({children}) => {
    const {isAuthenticated,login} = useAuthContext();
    if(isAuthenticated)
        return (
            <>{children}</>
        )
    return (
        <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
            <Card>
                <CardMedia
                    component="img"
                    height="300"
                    width="300"
                    image="https://upload.wikimedia.org/wikipedia/commons/0/04/QR-code-obituary.svg"
                />
                <CardContent>

                </CardContent>
                <CardActions>
                    <Box width='100%' display='flex' justifyContent='center'>
                        <Button variant='contained' onClick={() => login('fla@gmail.com','123456a')}>
                            Entrar
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>
   )
}
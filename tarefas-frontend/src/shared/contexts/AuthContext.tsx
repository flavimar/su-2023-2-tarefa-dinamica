import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {AuthService} from "../services/api/auth/AuthService";

interface IAuthContextData {
    isAuthenticated: boolean;
    logout: ()=> void;
    login:(email:string,password:string) => Promise<string | void>
}
interface  IAuthProviderProps {
    children: React.ReactNode;
}
const AuthContext = createContext({} as IAuthContextData);
export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
    const [accessToken, setAccessToken] = useState<string>()
    useEffect(() => {
        const accessToken = localStorage.getItem('APP_ACCESS_TOKEN');
        if (accessToken){
            setAccessToken(JSON.parse(accessToken))
        }else {
            setAccessToken(undefined);
        }
    })

    const handleLogin = useCallback(async (email:string,password:string) => {
        const result = await AuthService.auth(email,password);
        if (result instanceof Error){
            return result.message;
        }else {
            localStorage.setItem('APP_ACCESS_TOKEN',JSON.stringify(result.accessToken))
            setAccessToken(result.accessToken);
        }
    },[]);
    const handleLogout = useCallback(() => {
        localStorage.removeItem('APP_ACCESS_TOKEN')
        setAccessToken(undefined)
    },[]);
    const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);
    return (
        <AuthContext.Provider value={{isAuthenticated:isAuthenticated,login: handleLogin,logout:handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => useContext(AuthContext);
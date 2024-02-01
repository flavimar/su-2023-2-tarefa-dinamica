import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {AuthService} from "../services/api/auth/AuthService";
import {Api} from "../services/api/axios-config";

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
            Api.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(accessToken);
            setAccessToken(JSON.parse(accessToken))
        }else {
            setAccessToken(undefined);
        }
    }, [])
    const handleLogin = useCallback(async (email:string,password:string) => {
        const result = await AuthService.auth(email,password);
        if (result instanceof Error){
            return result.message;
        }else {
            localStorage.setItem('APP_ACCESS_TOKEN',JSON.stringify(result.accessToken))
            localStorage.setItem('APP_USER', result.email);
            localStorage.setItem('APP_ROLE', result.role);
            Api.defaults.headers.common['Authorization'] = 'Bearer ' + result.accessToken;

            setAccessToken(result.accessToken);
        }
    },[]);
    const handleLogout = useCallback(() => {
        localStorage.removeItem('APP_ACCESS_TOKEN')
        localStorage.removeItem('APP_USER')
        localStorage.removeItem('APP_ROLE')
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
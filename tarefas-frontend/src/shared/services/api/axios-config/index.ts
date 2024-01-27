import axios from "axios";
import {responseInterceptor} from "./interceptors/ResponseInterceptor";
import {errorInterceptor} from "./interceptors/ErrorInterceptor";
const getToken = () => {
    const token = localStorage.getItem('APP_ACCESS_TOKEN')
    console.log(token)
    if(token){
        return JSON.parse(token);
    }else {
        return '';
    }
}
const Api = axios.create({
    baseURL: 'http://18.211.13.14:8080/task-api',
    headers: {
        Authorization: `Bearer ${getToken()}`,
    }
})
Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);
export {Api};
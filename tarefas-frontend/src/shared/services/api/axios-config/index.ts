import axios from "axios";
import {responseInterceptor} from "./interceptors/ResponseInterceptor";
import {errorInterceptor} from "./interceptors/ErrorInterceptor";
const Api = axios.create({
    baseURL: 'http://18.211.13.14:8080/task-api',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN')}`,
    }
})
Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);
export {Api};
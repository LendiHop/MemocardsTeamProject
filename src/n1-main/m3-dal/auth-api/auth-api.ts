import axios from "axios";
import { ProfileDataType } from "../../m2-bll/reducers/profile-reducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
});

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ProfileDataType>('auth/login', data);
    },
    logout() {
        return instance.delete<{info: string, error: string}>('auth/me');
    },
    register(email: string, password: string) {
        return instance.post('auth/register', {email, password})
    },
    forgot(email: string){
        return instance.post(`auth/forgot`).then(response => response.data)
    },
}
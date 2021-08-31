import axios from "axios";
import { ProfileDataType } from "../../m2-bll/reducers/profile-reducer";

export const instance = axios.create({
    withCredentials: true,
    // baseURL: "https://neko-back.herokuapp.com/2.0/",
    baseURL: 'http://localhost:7542/2.0/',
});

export const authAPI = {
    me() {
        return instance.post<ProfileDataType>('auth/me').then(res => res.data)
    },
    login(data: LoginParamsType) {
        return instance.post<ProfileDataType>('auth/login', data);
    },
    logout() {
        return instance.delete<{info: string, error: string}>('auth/me');
    },
    forgot(email: string) {
        return instance.post<PassResponseType>(`auth/forgot`, {email,
            from: "test-front-admin <ai73a@yandex.by>",
            message:`<div style="background-color: lime; padding: 15px"><a href='http://localhost:3000/#/set-new-password/$token$'>\t\t\n' +
        '\tlink</a></div>` }).then(res => res.data)
    },
    register(email: string, password: string) {
        return instance.post<RegisterResponseType>('auth/register', {email, password}).then(res => res.data)
    },
    setNewPass(password: string, token: string ) {
        return instance.post<PassResponseType>('auth/set-new-password/',
            {password, resetPasswordToken: token}).then(res => res.data)
    }
}



//types

type PassResponseType = {
    info: string
    error?: string
}

type RegisterResponseType = {
    addedUser: any
    error?: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
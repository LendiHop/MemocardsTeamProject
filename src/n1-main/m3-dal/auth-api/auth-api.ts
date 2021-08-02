import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
});

//раскомментируете и пишете свою часть
export const authAPI = {
    me() {
        return instance.post<UserType>('auth/me').then(res => res.data)
    },

    forgot(email: string) {
        return instance.post<PassResponseType>(`auth/forgot`, {email,
            from: "test-front-admin <ai73a@yandex.by>", message:`<div style="background-color: lime; padding: 15px"><a href=\'http://localhost:3000/#/set-new-password/$token$\'>\t\t\n' +
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

type PassResponseType = {
    info: string
    error?: string
}

type RegisterResponseType = {
    addedUser: any
    error?: string
}
export type UserType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}
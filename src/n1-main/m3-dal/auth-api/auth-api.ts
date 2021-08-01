import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
});

//раскомментируете и пишете свою часть
export const authAPI = {
    me() {
        return instance.post<UserType>('auth/me')
    },

    forgot(email: string) {
        return instance.post(`auth/forgot`, {email,
            from: "test-front-admin <ai73a@yandex.by>", message:`<div style="background-color: lime; padding: 15px"><a href=\'http://localhost:3000/#/set-new-password/$token$\'>\t\t\n' +
        '\tlink</a></div>` })
    },
    register(email: string, password: string) {
        return instance.post('auth/register', {email, password})
    },
    setNewPass(password: string, token: string = 'tokenApi') {
        return instance.post('auth/set-new-password/', {password, resetPasswordToken: token})
    }
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
import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/', withCredentials: true
})

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export type ProfileDataType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод

    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean

    error?: string
}

export const loginAPI = {
    login(data: LoginParamsType) {
        return instance.post<ProfileDataType>('auth/login', data);
    },
    logout() {
        return instance.delete<{info: string, error: string}>('auth/me');
    },
}
import axios from "axios";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,

});

//раскомментируете и пишете свою часть
export const authAPI = {
    me() {
        return instance.post(`auth/me`, {}).then(response => response.data);
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post(`auth/login`, {email, password, rememberMe}).then(response => response.data);
    },
    logout() {
        return instance.delete(`auth/login`).then(response => response.data);
    },
    register(email: string, password: string) {
        return instance.post('auth/register', {email, password})
    }
}
import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
});

//раскомментируете и пишете свою часть
export const authAPI = {
    forgot(data: any) {
        return instance.post(`auth/forgot`, {...data})
    },
    register(email: string, password: string) {
        return instance.post('auth/register', {email, password})
    },
    setNewPass(password: string) {
        return instance.post('auth/set-new-password', {password})
    }
}
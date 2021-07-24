import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://neko-back.herokuapp.com/2.0',
});

//раскомментируете и пишете свою часть
// export const authAPI = {
//     me() {
//         return instance.get(`auth/me`).then(response => response.data);
//     },
//     login(email: string, password: string, rememberMe: boolean = false) {
//         return instance.post(`auth/login`, { email, password, rememberMe }).then(response => response.data);
//     },
//     logout() {
//         return instance.delete(`auth/login`).then(response => response.data);
//     },
// }
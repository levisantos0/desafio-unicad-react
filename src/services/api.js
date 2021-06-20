import axios from 'axios';
//Conecta o front-end com o back-end
const api = axios.create({
    baseURL: 'http://localhost:8081'
})
export default api;
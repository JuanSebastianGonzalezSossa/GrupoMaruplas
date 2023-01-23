import axios from 'axios'

const serviceMaruplas = axios.create({
    baseURL: 'http://localhost:4000/api'
});

//Configuracion de los intersectores

serviceMaruplas.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }  

    return config;
})

export default serviceMaruplas;
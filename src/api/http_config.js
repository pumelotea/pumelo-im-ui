import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import API from './index'

axios.interceptors.request.use(config => {
    if (process.env.NODE_ENV === "development"){
        config.baseURL = window.api.dev.http
    }

    if (process.env.NODE_ENV === "production") {
        config.baseURL = window.api.prod.http
    }
    // if(!API.isLogin()){
    //   router.push({path: '/login'})
    // }
    config.headers.authorization ='bearer ' + API.getToken()
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(
    response => {
        // token 无效返回，直接跳转回登陆界面
        if (response.data.code == 60006 ||response.data.code == 60007) {
            API.cleanLoginStatus()
            router.push('/login')
            return
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    });

Vue.prototype.$http = axios

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then(
                res => {
                    resolve(res.data)
                },
                err => {
                    reject(err.data)
                }
            )
            .catch(err => {
                reject(err.data)
            })
    })
}

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

export function del(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .delete(url, params)
            .then(
                res => {
                    resolve(res.data)
                },
                err => {
                    reject(err.data)
                }
            )
            .catch(err => {
                reject(err.data)
            })
    })
}

export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .put(url, params)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}


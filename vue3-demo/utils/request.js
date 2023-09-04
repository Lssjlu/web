import axios from "axios";
import {globals} from "@/main";

const serverUrl = globals.$config?.serverUrl || 'http://localhost:9090'

const request = axios.create({
    baseURL: serverUrl,
    timeout: 30000
})

request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    return config
}, error => {
    console.log('request error: ' + error) // for error debug
    return Promise.reject(error)
})

request.interceptors.response.use(response => {
    let res = response.data
    //  res.code
    return res
}, error => {
    console.log('response error: ' + error) // for error debug
    return Promise.reject(error)
})

export default request

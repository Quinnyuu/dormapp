import axios from 'axios'
export function request(config) {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:3000/api',
        timeout: 30000
    })
    //axios的拦截器
    //axios拦截请求
    instance.interceptors.request.use(config => {
        //console.log(config);
        return config; //拦截处理完返回请求，以便继续响应此请求
    },
        err => {
        console.log(err);
    }
    )
    //axios拦截响应,返回的是结果
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res; //拦截处理完返回结果
    },
        err => {
        console.log(err);
    })
    return instance(config)
}

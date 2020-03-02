import axios from 'axios';
import router from '../router'
import { Message } from 'element-ui';

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 300000,
});
instance.interceptors.response.use (
    response => {
        if(response.data.code == 200){
            return response.data.data
        } else if(response.data.code == 999){
            router.push({ name: 'Login' })
        } else {
            Message.error({ message: response.data.msg });
            return Promise.reject(response.data)
        }
    },
    error => {
        if (error.response) {
            switch (error.response.code) {
                case 500 :
                    Message.error({ message: '系统异常请稍后在试！' });
                    break;
            }
        }
        return Promise.reject(error.response)
    }
);

export default instance;
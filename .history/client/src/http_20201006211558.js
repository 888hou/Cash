import axios from 'axios';
import { Loading } from 'element-ui';

let loading;
function stringLoading(){
    loading = Loading.service({
        lock:true,
        text:"拼命加载中。。。",
        background: 'rgba(0,0,0,0.7)'
    });
}
function endLoading(){
    loading.close();
}
//请求拦截
axios.interceptors.request.use(config => {
    //加载动画
    stringLoading();
    return config;
});
//响应拦截
axios.interceptors.response.use(config => {
    //加载动画
    endLoading();
    return config;
});

export default axios;
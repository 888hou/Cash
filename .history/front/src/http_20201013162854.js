import axios from 'axios';
import { Toast } from 'vant';
import router from './router';

let loading;
function stringLoading(){
    loading = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        overlay: true
    });
}
function endLoading(){
    loading.clear();
}
//请求拦截
axios.interceptors.request.use(config => {
    //加载动画
    stringLoading();
    if(localStorage.kfToken) {
        //设置统一的请求头header
        config.headers.Authorization = localStorage.kfToken;
    }
    return config;
},error => {
    return Promise.reject(error);
});
//响应拦截
axios.interceptors.response.use(response => {
    //加载动画
    endLoading();

    return response;
},error => {
    //错误提醒
    endLoading();
    console.log(error);
    Toast.fail(error.response.data);
    //获取错误状态码
    const { status } = error.response;
    if ( status == 401 ){
        Toast.fail('Token失效，请重新登录');
        //清楚Token
        localStorage.removeItem('wxToken');
        //跳转到登录页面；
        router.push('/login');
    }
    return Promise.reject(error);
});

export default axios;
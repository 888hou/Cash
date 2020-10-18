import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Home from './views/Home.vue'
import InfoShow from './views/InfoShow.vue'
import FundList from './views/FundList.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Suggestion from './views/Suggestion.vue'
import Suggestionlist from './views/Suggestionlist.vue'
import NotFound from './views/404.vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children:[
        {path:"",component:Home},
        {path:"/home",name:'home',component:Home}, 
        {path:"/infoshow",name:'infoshow',component:InfoShow},
        {path:"/fundlist",name:'fundlist',component:FundList},
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login/:openid',
      name: 'LoginbyOpenid',
      component: Login
    },
    {
      path: '/login/:openid/:route',
      name: 'LoginbyOpenidandRoute',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/suggestionlist',
      name: 'Suggestionlist',
      component: Suggestionlist
    },
    {
      path: '/suggestion',
      name: 'Suggestion',
      component: Suggestion
    },
    {
      path: '*',
      name: '/404',
      component: NotFound
    }
  ]
});

//路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.kfToken ? true : false;
  if(to.path.indexOf("/login") == 0 ||  to.path == "/register" ||  to.path == "/404") {
    next();
  }else{
    //console.log(to);
    //console.log(isLogin);
    //console.log(localStorage.kfToken);
    isLogin ? next() : next("/login");
  }
});

export default router;

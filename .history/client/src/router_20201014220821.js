import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Home from './views/Home.vue'
import InfoShow from './views/InfoShow.vue'
import FundList from './views/FundList.vue'
import SuggestionList from './views/SuggestionList.vue'
import UserList from './views/UserList.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
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
        {path:"/suggestionlist",name:'suggestionlist',component:SuggestionList},
        {path:"/userlist",name:'userlist',component:UserList},
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
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
  const isLogin = localStorage.eleToken ? true : false;
  if(to.path == "/login") {
    next();
  }else{
    isLogin ? next() : next("/login");
  }
});

export default router;

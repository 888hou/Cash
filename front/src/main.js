import Vue from 'vue';
import App from './App.vue';
import axios from './http';
import Vant from 'vant';
import 'vant/lib/index.css';

import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(Vant);
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_AUTHENTICATED:'SET_AUTHENTICATED',
  SET_USER:'SET_USER'
}

const state = {
  isAuthenticated: false,
  user:{}
};
const getters = {
  isAuthenticated: state=>state.isAuthenticated,
  user : state=>state.user
};

const mutations = {
  [types.SET_AUTHENTICATED](state,isAuthenticated) {
    if(isAuthenticated) state.isAuthenticated = isAuthenticated;
    else state.isAuthenticated = false;
  }
};

const actions = {

};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

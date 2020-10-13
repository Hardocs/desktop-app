import Vue from 'vue';
import Vuex from 'vuex';
import * as docs from '@/store/docs';
import * as metadata from '@/store/metadata'
// import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    docs,
    metadata
  },
  // plugins: [createPersistedState({
  //   storage: window.sessionStorage,
  // })],
  state: {},
  mutations: {},
  actions: {},
  getters:{}
});

import Vue from 'vue';
import Vuex from 'vuex';
import * as docs from '@/store/docs';
import * as metadata from '@/store/metadata'
// import { msgStoreToMain } from '@/store/docs'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    docs,
    metadata
  },
  // plugins:[ msgStoreToMain ],
  state: {},
  mutations: {},
  actions: {},
  getters:{}
});

import Vue from 'vue';
import Vuex from 'vuex';
import * as docs from './docs';
import { ipcOperations } from '../services';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    docs
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {}
});

ipcOperations.checkUnsavedDocs(store);
ipcOperations.passAppPath(store);

export default store;

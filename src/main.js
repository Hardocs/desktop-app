import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles/index.css';
import JsonEditor from 'vue-json-edit'
  

Vue.config.productionTip = false;


Vue.use(JsonEditor);

new Vue({
  router,
  store,
  // apolloProvider,
  render: (h) => h(App)
}).$mount('#app');


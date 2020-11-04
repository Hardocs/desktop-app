import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import CKEditor from '@ckeditor/ckeditor5-vue';
import './assets/styles/index.css';
import JsonEditor from 'vue-json-edit'
import vueShortkey from 'vue-shortkey'


Vue.config.productionTip = false;

Vue.use(CKEditor);

Vue.use(JsonEditor);
Vue.use(vueShortkey)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  // apolloProvider,
  render: (h) => h(App)
}).$mount('#app');

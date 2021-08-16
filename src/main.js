import vuetify from '@/plugins/vuetify';
import CKEditor from '@ckeditor/ckeditor5-vue';
import Vue from 'vue';
import vueShortkey from 'vue-shortkey';
import App from './App.vue';
import './assets/styles/index.css';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(CKEditor);

Vue.use(vueShortkey);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');

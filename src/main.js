import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueApollo from 'vue-apollo';
import 'codemirror/lib/codemirror.css';

import './assets/styles/index.css';

Vue.config.productionTip = false;

// const apolloProvider = new VueApollo({
//   defaultClient: apiClient
// })

new Vue({
  router,
  store,
  // apolloProvider,
  render: (h) => h(App)
}).$mount('#app');

Vue.use(VueApollo);

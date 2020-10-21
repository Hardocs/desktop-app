// import { routes } from '../configs/menu.config.js';
import Vue from 'vue';
import VueRouter from 'vue-router';

// let views = { path: '@/views/', format: '.vue' }


Vue.use(VueRouter);

export const routes = [
  {
    path: '/doc/:id',
    component: () => import('@/views/Doc.vue')
  },
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index.vue')
  },

];

// THIS DIDNT WORK BUT IT WAS A NICE
routes.forEach((action) => {
  if (action.name && !action.component) {
      // action['component'] = () => import(`${views.path}${action.name}${views.format}`);
      // console.log(action['component'].toString())
      let path = action.name.charAt(0).toLowerCase() + action.name.slice(1);
      path = path.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
      action['path']= `/${path}/`;
      action['label'] = action.path.replace('-', ' ');
    }
});

const router = new VueRouter({
  routes
});

export default router

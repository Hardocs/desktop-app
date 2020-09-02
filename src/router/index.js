import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/doc/:id", component: () => import("@/components/Id.vue")
  },
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;

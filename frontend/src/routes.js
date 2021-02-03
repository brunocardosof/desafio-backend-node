import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/signup",
      alias: "signup",
      name: "signup",
      component: () => import("./components/Auth/Signup"),
    },
    {
      path: "/signin",
      alias: "signin",
      name: "signin",
      component: () => import("./components/Auth/Signin"),
    },
    {
      path: "/category",
      name: "category",
      component: () => import("./components/Category"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/product",
      name: "product",
      component: () => import("./components/Product"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/sale",
      name: "sale",
      component: () => import("./components/Sale"),
      meta: {
        requiresAuth: true
      }
    }
  ]
});
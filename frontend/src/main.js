import Vue from 'vue';
import App from './App.vue';
import router from './routes';

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('loggedUser') == null) {
      next({
        path: '/signin',
        params: { nextUrl: to.fullPath }
      });
    }
  } else {
    next();
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

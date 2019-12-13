import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from 'views/home/home';
import Login from 'views/login/login';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'hash',
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
  ]
})
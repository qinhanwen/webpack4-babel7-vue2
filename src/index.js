import Vue from 'vue';
import router from './router/index';
import App from './app';

new Vue({
  comments: {
    App
  },
  router,
  render: h => h(App)
}).$mount('#app')
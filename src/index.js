import Vue from 'vue';
import App from './app';
// import router from './router';

new Vue({
  comments: {
    App
  },
  // router,
  render: h => h(App)
}).$mount('#app')
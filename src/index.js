// import {
//   square,
//   cube
// } from './index1.js'
// console.log('打印2的平方', square(2))

// const app = document.getElementById('app')
// app.innerHTML = 'hello world';

// import {
//   A,
//   B
// } from './index1.js'
// new A();
// new B();

import Vue from 'vue';
import router from './router/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './app';

Vue.use(ElementUI);

new Vue({
  comments: {
    App
  },
  router,
  render: h => h(App)
}).$mount('#app');

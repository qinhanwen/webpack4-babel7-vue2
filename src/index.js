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
}).$mount('#app')
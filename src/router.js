import Vue from 'vue';
import Router from 'vue-router';
import ShopView from './views/ShopView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopView,
    }
  ],
});

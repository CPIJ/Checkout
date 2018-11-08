import Vue from 'vue';
import Router from 'vue-router';
import ShopView from './views/ShopView.vue';
import BoundingboxView from './views/BoundingboxView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopView,
    },
    {
      path: '/set-boundingbox',
      name: 'set-boundingbox',
      component: BoundingboxView,
      props: (route) => ({ image: route.params.image })
    }
  ],
});

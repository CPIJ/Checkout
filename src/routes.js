import ShopView from "./views/ShopView.vue";
import BoundingboxView from "./views/BoundingboxView.vue";
import ShoppingCartView from "./views/ShoppingCartView";
import TrainedImagesView from "./views/TrainedImagesView";
import CheckoutView from "./views/CheckoutView";
import PayView from "./views/PayView";
import CashRegisterView from "./views/CashRegisterView";
import HomeView from "./views/HomeView";
import LaunchView from "./views/LaunchView";

const routes = [
  {
    path: "/shop",
    name: "shop",
    component: ShopView,
    meta: {
      title: 'Checkout | Winkel'
    }
  },
  {
    path: "/set-boundingbox",
    name: "set-boundingbox",
    component: BoundingboxView,
    props: route => ({ image: route.params.image, ean: route.params.ean }),
    meta: {
      title: 'Checkout | Selecteer product'
    }
  },
  {
    path: "/shopping-cart",
    name: "shopping-cart",
    component: ShoppingCartView,
    meta: {
      title: 'Checkout | Winkelwagen'
    }
  },
  {
    path: "/trained-images",
    name: "trained-images",
    component: TrainedImagesView,
    meta: {
      title: 'Checkout | Training afbeeldingen'
    }
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutView,
    meta: {
      title: 'Checkout | Afrekenen'
    }
  },
  {
    path: "/pay/:userId",
    name: "pay",
    component: PayView,
    props: route => ({ userId: route.params.userId }),
    meta: {
      title: 'Checkout | Betaal'
    }
  },
  {
    path: "/cash-register",
    name: "cash-register",
    component: CashRegisterView,
    meta: {
      title: 'Checkout | Kassa'
    }
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: {
      title: 'Checkout | Scan je boodschappen gemakkelijk en overal!'
    }
  },
  {
    path: "/",
    name: "launch",
    component: LaunchView,
    meta: {
      title: 'Checkout'
    }
  },
  {
    path: '*',
    name: '404',
    component: HomeView,
    meta: {
      title: '404'
    }
  }
];

export default routes;

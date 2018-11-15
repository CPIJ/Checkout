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
    component: ShopView
  },
  {
    path: "/set-boundingbox",
    name: "set-boundingbox",
    component: BoundingboxView,
    props: route => ({ image: route.params.image, ean: route.params.ean })
  },
  {
    path: "/shopping-cart",
    name: "shopping-cart",
    component: ShoppingCartView
  },
  {
    path: "/trained-images",
    name: "trained-images",
    component: TrainedImagesView
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutView
  },
  {
    path: "/pay/:userId",
    name: "pay",
    component: PayView,
    props: route => ({ userId: route.params.userId })
  },
  {
    path: "/cash-register",
    name: "cash-register",
    component: CashRegisterView
  },
  {
    path: "/home",
    name: "home",
    component: HomeView
  },
  {
    path: "/",
    name: "launch",
    component: LaunchView
  }
];

export default routes;

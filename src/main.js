import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ProductServicePlugin from "@/plugins/ProductServicePlugin";
import ImageServicePlugin from "@/plugins/ImageServicePlugin";
import { library } from "@fortawesome/fontawesome-svg-core";
import BarcodeScannerPlugin from "@/plugins/BarcodeScannerPlugin";
import {
  faPlus,
  faMinus,
  faTrash,
  faChevronLeft,
  faShoppingCart,
  faCog,
  faMoneyBill,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueMqtt from "vue-mqtt";
import ProductClassifierPlugin from "@/plugins/ProductClassifierPlugin";
import VideoStreamPlugin from "@/plugins/VideoStreamPlugin";

library.add(
  faPlus,
  faMinus,
  faTrash,
  faChevronLeft,
  faShoppingCart,
  faCog,
  faMoneyBill,
  faArrowLeft
);
Vue.component("fa", FontAwesomeIcon);

Vue.use(ProductServicePlugin, {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID
});

Vue.use(ImageServicePlugin, { baseUrl: process.env.VUE_APP_IMAGE_API_BASE_URL });
Vue.use(VueMqtt, "wss://iot.eclipse.org/ws");
Vue.use(ProductClassifierPlugin);
Vue.use(VideoStreamPlugin);
Vue.use(BarcodeScannerPlugin, {
  videoElementName: "video",
  stream: Vue.prototype.$videoStream
});
Vue.use({
  install(Vue, options) {
    Vue.prototype.$dependenciesLoaded = () =>
      Vue.prototype.$productClassifier.loaded && Vue.prototype.$videoStream.loaded;
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.commit("initialize");
  },
  render: h => h(App)
}).$mount("#app");

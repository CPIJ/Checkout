import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ProductServicePlugin from "@/plugins/ProductServicePlugin"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faTrash, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus, faMinus, faTrash, faChevronLeft)
Vue.component('fa', FontAwesomeIcon)

Vue.use(ProductServicePlugin, {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

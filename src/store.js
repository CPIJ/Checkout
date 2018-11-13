import Vue from "vue";
import Vuex from "vuex";
const createUuid = require("uuid/v4");

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userId: null
  },
  mutations: {
    setUserId(state, newId) {
      state.userId = newId;
    },

    initialize(state) {
      const localState = localStorage.getItem("app-state");
      let id = null;

      if (localState) {
        const obj = JSON.parse(localState);

        if (obj["userId"]) {
          id = obj.userId;
        }
      }

      if (id === null) {
        id = createUuid();
        Vue.prototype.$productService.createNewCartFor(id)
      }

      state.userId = id
    }
  },
  actions: {}
});

store.subscribe((mutation, state) => {
  localStorage.setItem("app-state", JSON.stringify(state));
});

export default store;

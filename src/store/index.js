import Vue from "vue";
import Vuex from "vuex";
import form from "./modules/form";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    form,
    user
  }
  //   mutations: {},
  //   actions: {},
  //   modules: {}
});

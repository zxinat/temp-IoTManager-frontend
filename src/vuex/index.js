import Vue from 'vue';
import Vuex from 'vuex';
import userInfo from './user';
Vue.use(Vuex);

export const createStore = (stores = {}) => {
  return new Vuex.Store({
    modules: {
      ...stores,
      userInfo,
    }
  });
};

import Vue from 'vue';
import Vuex from 'vuex';
import userInfo from './user';
import device from './device';
Vue.use(Vuex);

export const createStore = (stores = {}) => {
  return new Vuex.Store({
    modules: {
      ...stores,
      userInfo,
      device
    }
  });
};

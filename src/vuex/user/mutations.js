import {
  SET_USER_INFO,
  SET_USER_LOADING
} from './mutation-type'
const mutations = {
  [SET_USER_INFO] (state, userInfo){
    Object.assign(state, userInfo);
  },
  [SET_USER_LOADING] (state, loading){
    state.loading = loading;
  }
};
export default mutations

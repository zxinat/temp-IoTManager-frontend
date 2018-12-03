import {
  SET_USER_INFO
} from './mutation-type'
const mutations = {
  [SET_USER_INFO] (state, userInfo){
    Object.assign(state, userInfo);
  }
};
export default mutations

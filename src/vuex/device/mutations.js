import {
  SET_DEVICE_TREE,
  SET_CURRENT_DEVICE_DATA
} from './mutation-type'
const mutations = {
  [SET_DEVICE_TREE] (state, data){
    Object.assign(state.deviceTree, data);
  },
  [SET_CURRENT_DEVICE_DATA](state,data){
    state.currentDeviceData=data
  }
};
export default mutations

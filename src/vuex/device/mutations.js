import {
  SET_DEVICE_TREE,
  SET_CURRENT_DEVICE_DATA, SET_DASHBOARD_DEVICE_OPTION
} from './mutation-type'
const mutations = {
  [SET_DEVICE_TREE] (state, data){
    Object.assign(state.deviceTree, data);
  },
  [SET_CURRENT_DEVICE_DATA](state,data){
    state.currentDeviceData=data
  },
  [SET_DASHBOARD_DEVICE_OPTION](state, data){
    state.dashboardDeviceOption=data;
  }
};
export default mutations

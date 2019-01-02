import {
  SET_DEVICE_TREE
} from './mutation-type'
const mutations = {
  [SET_DEVICE_TREE] (state, data){
    console.log(data);
    console.log(state)
    Object.assign(state.deviceTree, data);
  }
};
export default mutations

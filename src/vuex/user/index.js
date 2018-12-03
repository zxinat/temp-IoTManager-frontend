import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  id: '',
  username: '',
  type:'',
  isLogin:false,
  avatar: undefined,
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};

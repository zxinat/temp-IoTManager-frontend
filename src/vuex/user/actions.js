import * as Type from './mutation-type';
import { Message } from 'element-ui';
const getUserInfo = () => {};

const actions = {
  async setUserInfo({ commit, dispatch, state }, {
    name,
    type,
  }) {
      commit(Type.SET_USER_INFO,{
        username:name,
        type,
        isLogin:true
      });
  }
};

export default actions;

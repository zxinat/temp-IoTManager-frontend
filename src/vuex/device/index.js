import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  deviceTree:{

  },
  currentDeviceData:{
    "id": "1",
    "hardwareDeviceID": "001",
    "deviceName": "默认设备",
    "city": "默认城市",
    "factory": "默认工厂",
    "workshop": "默认车间",
    "deviceState": "正常",
    "LastConnectionTime": "2000-1-1",
    "imageUrl": "",
    "gatewayID": "T001",
    "mac": "",
    "address": [130,20],
    "deviceType": "类型1",
    "createTime": "2018-1-1",
    "updateTime": "2001-1-1",
    "remark": "miaoshumiaoshu"
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};

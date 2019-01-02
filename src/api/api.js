import axios from "axios";
axios.defaults.baseURL='https://www.easy-mock.com/mock/5c22475a4e21841210a7015f';
//登陆注册
export async function loginApi({name, pwd, type}) {
  return await axios.post('/api/login', {
    data: {name, pwd, type,}
  });
}
export async function signupApi({name,pwd, type,}) {
  return await axios.post('/api/signup', {
    data: {name, pwd, type,}
  });
}

//网关管理
export async function getGatewaysApi() {
  return await axios.get('/api/gateway');
}

export async function deleteGatewayApi(id) {
  return await axios.delete(`/api/gateway/${id}`);
}

export async function updateGatewayApi(data) {
  return await axios.put(`/api/gateway/${data.hardwareGatewayID}`,{
    ...data
  });
}

export async function addGatewayApi(data){
  return await axios.post(`/api/gateway/${data.hardwareGatewayID}`,{
    ...data
  });
}

export async function searchGatewaysApi(data) {
  return await axios.get('/api/gateway',{
    params:{
      ...data
    }
  });
}

//设备管理
export async function getDevicesApi() {
  return await axios.get('/api/device');
}

export async function deleteDeviceApi(id) {
  return await axios.delete(`/api/device/${id}`);
}

export async function updateDeviceApi(data) {
  return await axios.put(`/api/device/${data.hardwareDeviceID}`,{
    ...data
  });
}

export async function addDeviceApi(data){
  return await axios.post(`/api/device`,{
    ...data
  });
}

export async function searchDevicesApi(data) {
  return await axios.get('/api/device',{
    params:{
      ...data
    }
  });
}
//单个设备
export async function getDeviceApi(id){
  return await axios.get(`/api/device/${id}`);
}

//设备数据
export async function getDevicesDataApi() {
  return await axios.get('/api/deviceData');
}

export async function deleteDeviceDataApi(id) {
  return await axios.delete(`/api/deviceData/${id}`);
}

export async function updateDeviceDataApi(data) {
  console.log(data);
  return await axios.put(`/api/deviceData/${data.ID}`,{
    ...data
  });
}

export async function addDeviceDataApi(data){
  return await axios.post(`/api/device`,{
    ...data
  });
}

export async function searchDeviceDataApi(data) {
  return await axios.get('/api/deviceData',{
    params:{
      ...data
    }
  });
}

//监控
export async function getDeviceTreeApi() {
  return await axios.get('/api/deviceTree');
}

//告警信息
export async function getAlarmInformationApi() {
  return await axios.get('/api/alarmInformation');
}
export async function updateAlarmInformationApi(data) {
  return await axios.put(`/api/alarmInformation/${data.id}`,{
    ...data
  });
}

export async function handleAllAlarmInformationApi(data){
  return await axios.post(`/api/alarmInformation`,{
    ...data
  });
}

export async function searchAlarmInformationApi(data) {
  return await axios.get('/api/alarmInformation',{
    params:{
      ...data
    }
  });
}
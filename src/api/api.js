import axios from "axios";
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
  return await axios.get(' https://www.easy-mock.com/mock/5c22475a4e21841210a7015f/api/gateway');
}

export async function deleteGatewayApi(id) {
  return await axios.delete(`https://www.easy-mock.com/mock/5c22475a4e21841210a7015f/api/gateway/${id}`);
}

export async function updateGatewayApi(data) {
  return await axios.put(`https://www.easy-mock.com/mock/5c22475a4e21841210a7015f/api/gateway/${data.hardwareGatewayID}`,{
    ...data
  });
}

export async function addGatewayApi(data){
  return await axios.post(`https://www.easy-mock.com/mock/5c22475a4e21841210a7015f/api/gateway/${data.hardwareGatewayID}`,{
    ...data
  });
}

export async function searchGatewaysApi(data) {
  return await axios.get(' https://www.easy-mock.com/mock/5c22475a4e21841210a7015f/api/gateway',{
    params:{
      ...data
    }
  });
}

//设备管理
export async function getDevicesApi() {
  return await axios.get(' https://www.easy-mock.com/mock/5c22475a4e21841210a7015f/api/device');
}

export async function deleteDeviceApi(id) {
  return await axios.delete(`https://www.easy-mock.com/mock/5c22475a4e21841210a7015f/api/device/${id}`);
}

export async function updateDeviceApi(data) {
  return await axios.put(`https://www.easy-mock.com/mock/5c22475a4e21841210a7015f/api/device/${data.hardwareDeviceID}`,{
    ...data
  });
}

export async function addDeviceApi(data){
  return await axios.post(`https://www.easy-mock.com/mock/5c22475a4e21841210a7015f/api/device`,{
    ...data
  });
}

export async function searchDevicesApi(data) {
  return await axios.get(' https://www.easy-mock.com/mock/5c22475a4e21841210a7015f/api/device',{
    params:{
      ...data
    }
  });
}

//设备数据
export async function getDevicesDataApi() {
  return await axios.get(' https://www.easy-mock.com/mock/5c22475a4e21841210a7015f/api/deviceData');
}

export async function deleteDeviceDataApi(id) {
  return await axios.delete(`https://www.easy-mock.com/mock/5c22475a4e21841210a7015f/api/deviceData/${id}`);
}

export async function updateDeviceDataApi(data) {
  console.log(data);
  return await axios.put(`https://www.easy-mock.com/mock/5c22475a4e21841210a7015f/api/deviceData/${data.ID}`,{
    ...data
  });
}

export async function addDeviceDataApi(data){
  return await axios.post(`https://www.easy-mock.com/mock/5c22475a4e21841210a7015f/api/device`,{
    ...data
  });
}

export async function searchDeviceDataApi(data) {
  return await axios.get(' https://www.easy-mock.com/mock/5c22475a4e21841210a7015f/api/deviceData',{
    params:{
      ...data
    }
  });
}

//监控
export async function getDeviceTreeApi() {
  return await axios.get(' https://www.easy-mock.com/mock/5c22475a4e21841210a7015f/api/deviceTree');
}

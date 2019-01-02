import axios from 'axios';

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

import axios from 'axios';

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
  return await axios.post(`https://www.easy-mock.com/mock/5c22475a4e21841210a7015f/api/device/${data.hardwareDeviceID}`,{
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

import axios from 'axios';

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

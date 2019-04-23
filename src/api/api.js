import axios from "axios";
//axios.defaults.baseURL='https://www.easy-mock.com/mock/5c22475a4e21841210a7015f';
axios.defaults.baseURL='https://localhost:44373';
//登陆注册
export  function loginApi({name, pwd, type}) {
  return  axios.post('/api/login', {
    data: {name, pwd, type,}
  });
}
export  function signupApi({name,pwd, type,}) {
  return  axios.post('/api/register', {
    data: {name, pwd, type,}
  });
}
//折线图
export  function getDeviceProperty(id) {
  return  axios.get(`api/deviceProperty/${id}`);

}
export  function getDevicePropertyData(deviceid,propertyid) {
  return  axios.get(`/api/devicePropertyData/${deviceid}/${propertyid}`);

}


//网关管理
export  function getGatewaysApi() {
  return  axios.get('/api/gateway');
}

export  function deleteGatewayApi(id) {
  return  axios.delete(`/api/gateway/${id}`);
}
export  function deleteMultipleGatewayApi(id) {
  return  axios.delete(`/api/multipleGateway`,{
    params:{
      ...id
    }
  });
}

export  function updateGatewayApi(data) {
  return  axios.put(`/api/gateway/${data.id}`,{
    ...data
  });
}

export  function addGatewayApi(data){
  return  axios.post(`/api/gateway`,{
    ...data
  });
}

export  function searchGatewaysApi(data) {
  return  axios.get('/api/gateway',{
    params:{
      ...data
    }
  });
}

//设备管理
export  function getDevicesApi() {
  return  axios.get('/api/device');
}

export  function deleteDeviceApi(id) {
  return  axios.delete(`/api/device/${id}`);
}

export  function deleteMultipleDeviceApi(id) {
  return  axios.delete(`/api/multipleDevice`,{
    params:{
      ...id
    }
  });
}



export  function updateDeviceApi(data) {
  return  axios.put(`/api/device/${data.id}`,{
    ...data
  });
}

export  function addDeviceApi(data){
  return  axios.post(`/api/device`,{...data});
}

export  function searchDevicesApi(data) {
  return  axios.get('/api/device',{
    params:{
      ...data
    }
  });
}


//单个设备
export  function getDeviceApi(id){
  return  axios.get(`/api/device/${id}`);
}

//设备数据
export  function getDevicesDataApi() {
  return  axios.get('/api/deviceData');
}

export  function deleteDeviceDataApi(id) {
  return  axios.delete(`/api/deviceData/${id}`);
}
export  function deleteMultipleDataApi(id) {
  return  axios.delete(`/api/multipleDeviceData`,{
    params:{
      ...id
    }
  });
}

export  function updateDeviceDataApi(data) {//
  console.log(data);
  return  axios.put(`/api/deviceData/${data.id}`,{
    ...data
  });
}

export  function addDeviceDataApi(data){
  return  axios.post(`/api/device`,{
    ...data
  });
}

export  function searchDeviceDataApi(data) {
  return  axios.get('/api/deviceData',{
    params:{
      ...data
    }
  });
}

//监控
export  function getDeviceTreeApi() {
  return  axios.get('/api/deviceTree');
}

//告警信息
export  function getAlarmInformationApi() {
  return  axios.get('/api/alarmInformation');
}
export  function updateAlarmInformationApi(data) {
  return  axios.put(`/api/alarmInformation/${data.id}`,{
    ...data
  });
}

export  function handleAllAlarmInformationApi(handleData,id){
  return  axios.post(`/api/alarmInformation`,{
    handleData,
    id:{
      ...id
    }
  });
}

export  function searchAlarmInformationApi(data) {
  return  axios.get('/api/alarmInformation',{
    params:{
      ...data
    }
  });
}

// 报表中心
// 概览
export function getReportStaticIndexHistogram1() {
  return axios.get('/api/ReportStaticIndexHistogram1');
}
export function getReportStaticIndexPieChart1() {
  return axios.get('/api/ReportStaticIndexPieChart1');
}
export function getReportStaticIndexHistogram2() {
  return axios.get('/api/ReportStaticIndexHistogram2');
}
export function getReportStaticIndexPieChart2() {
  return axios.get('/api/ReportStaticIndexPieChart2');
}
// 按天统计
export function getReportStaticDailyHistogram(selectedType,selectedSource,time) {
  return axios.get('/api/ReportStaticDailyHistogram',{
    selectedType:selectedType,
    selectedSource:selectedSource,
    time:time
  });
}

export function getReportStaticDaithlyPieChart(selectedType,selectedSource,time) {
  return axios.get('/api/ReportStaticDailyPieChart',{
    selectedType:selectedType,
    selectedSource:selectedSource,
    time:time
  });
}
// 按月统计
export function getReportStaticMonthlyHistogram(selectedType,selectedSource,time) {
  return axios.get('/api/ReportStaticMonthlyHistogram',{
    selectedType:selectedType,
    selectedSource:selectedSource,
    time:time
  });
}

export function getReportStaticMonthlyPieChart(selectedType,selectedSource,time) {
  return axios.get('/api/ReportStaticMonthlyPieChart',{
    selectedType:selectedType,
    selectedSource:selectedSource,
    time:time
  });
}
// 按资源类别费用统计
export function getReportStaticByCategoryTable(selectedType,selectedSource,time) {
  return axios.get('/api/ReportStaticByCategoryTable',{
    selectedType:selectedType,
    selectedSource:selectedSource,
    time:time
  });
}
export function getReportStaticByCategoryTypeHistogram(selectedType,selectedSource,time) {
  return axios.get('/api/ReportStaticByCategoryTypeHistogram',{
    selectedType:selectedType,
    selectedSource:selectedSource,
    time:time
  });
}
export function getReportStaticByCategorySubClassHistogram(selectedType,selectedSource,time) {
  return axios.get('/api/gReportStaticByCategorySubClassHistogram',{
    selectedType:selectedType,
    selectedSource:selectedSource,
    time:time
  });
}



// 按订阅费用统计
export function getReportStaticBySubscribe(year) {
  return axios.get('/api/ReportStaticBySubscribe',{
    params:{
      year:year
    }
  });
}

// 月度费用报告
export function getReportOfMonthlyExpense() {
  return axios.get('/api/getReportOfMonthlyExpense');
}


export function checkMonthlyReport(order,date) {
  return axios.get('/api/checkMonthlyReport',{
    params:{
      order:order,
      date:date
    }
  });
}
// 用户管理
export function getAllDepartments() {
  return axios.get('/api/getAllDepartments');
}

export function getUserTable(username,depart) {
  return axios.get('/api/getUserTable',{
    params:{
      username:username,
      depart:depart
    }
  });
}

export function deleteUser(userID) {
  return axios.delete(`/api/deleteUser/${userID}`)
}

export function getAllAuthorities() {
  return axios.get('/api/getAllAuthorities');
}

export function getAuthorities(userID) {
  return axios.get(`/api/getAuthorities/${userID}`)
}

export function editAuthorities(userID,options) {
  return axios.post(`/api/editAuthorities`,{
    userID,
    options:options
  })
}

export function createNewUser(userInfo) {
  return axios.post(`/api/createNewUser`,{
    userInfo
  })
}

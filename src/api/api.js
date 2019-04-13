import axios from "axios";
axios.defaults.baseURL='https://www.easy-mock.com/mock/5c22475a4e21841210a7015f';
//axios.defaults.baseURL='http://localhost:5001';
//登陆注册
export async function loginApi({name, pwd, type}) {
  return await axios.post('/api/login', {
    data: {name, pwd, type,}
  });
}
export async function signupApi({name,pwd, type,}) {
  return await axios.post('/api/register', {
    data: {name, pwd, type,}
  });
}
//折线图
export async function getDeviceProperty(id) {
  return await axios.get(`api/deviceProperty/${id}`);

}
export async function getDevicePropertyData(deviceid,propertyid) {
  return await axios.get(`/api/devicePropertyData/${deviceid}/${propertyid}`);

}


//网关管理
export async function getGatewaysApi() {
  return await axios.get('/api/gateway');
}

export async function deleteGatewayApi(id) {
  return await axios.delete(`/api/gateway/${id}`);
}
export async function deleteMultipleGatewayApi(id) {
  return await axios.delete(`/api/multipleGateway`,{
    params:{
      ...id
    }
  });
}

export async function updateGatewayApi(data) {
  return await axios.put(`/api/gateway/${data.hardwareGatewayID}`,{
    ...data
  });
}

export async function addGatewayApi(data){
  return await axios.post(`/api/gateway`,{
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

export async function deleteMultipleDeviceApi(id) {
  return await axios.delete(`/api/multipleDevice`,{
    params:{
      ...id
    }
  });
}



export async function updateDeviceApi(data) {
  return await axios.put(`/api/device/${data.hardwareDeviceID}`,{
    ...data
  });
}

export async function addDeviceApi(data){
  return await axios.post(`/api/device`,{...data});
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
export async function deleteMultipleDataApi(id) {
  return await axios.delete(`/api/multipleDeviceData`,{
    params:{
      ...id
    }
  });
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

export async function handleAllAlarmInformationApi(handleData,id){
  return await axios.post(`/api/alarmInformation`,{
    handleData,
    id:{
      ...id
    }
  });
}

export async function searchAlarmInformationApi(data) {
  return await axios.get('/api/alarmInformation',{
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

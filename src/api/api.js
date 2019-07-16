import axios from "axios";

// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5c22475a4e21841210a7015f';
// axios.defaults.baseURL = 'http://139.217.219.205:8080';
axios.defaults.baseURL = 'http://localhost:5000';
// axios.defaults.baseURL='https://localhost:44373';
//带cookie
axios.defaults.withCredentials = true;
//登陆注册
export function loginApi({name, pwd, type}) {
  return axios.post('/api/login', {
    ...{name, pwd, type,}
  });
}

export function signupApi({name, pwd, type,}) {
  return axios.post('/api/register', {
    ...{name, pwd, type,}
  });
}

export function signOut(sessionID) {
  return axios.post('/api/logout', {
    sessionID: sessionID
  })
}

//折线图
export function getDeviceProperty(id) {
  return axios.get(`api/deviceProperty/${id}`);

}

export function getDevicePropertyData(deviceid, propertyid) {
  return axios.get(`/api/deviceData/${deviceid}/${propertyid}`);
}


//网关管理
export function getGatewaysApi() {
  return axios.get('/api/gateway');
}

export function deleteGatewayApi(id) {
  return axios.delete(`/api/gateway/${id}`);
}

export function deleteMultipleGatewayApi(id) {
  return axios.delete(`/api/multipleGateway`, {
    params: {
      ...id
    }
  });
}

export function updateGatewayApi(data) {
  return axios.put(`/api/gateway/${data.id}`, {
    ...data
  });
}

export function addGatewayApi(data) {
  return axios.post(`/api/gateway`, {
    ...data
  });
}

export function searchGatewaysApi(data) {
  return axios.get('/api/gateway', {
    params: {
      ...data
    }
  });
}

//设备管理
export function getDevicesApi() {
  return axios.get('/api/device');
}

export function deleteDeviceApi(id) {
  return axios.delete(`/api/device/${id}`);
}

export function deleteMultipleDeviceApi(id) {
  console.log({...id});
  return axios.post(`/api/device/batch/devices`, {...id});
}

export function getCity() {
  return axios.get('/api/city');
}

export function getFactory() {
  return axios.get('/api/factory');
}

export function getWorkshop() {
  return axios.get('/api/workshop');
}

export function getDeviceState() {
  return axios.get('/api/deviceState');
}

export function getDeviceType() {
  return axios.get('/api/deviceType');
}

export function getGatewayState() {
  return axios.get('/api/gatewayState');
}

export function getGatewayType() {
  return axios.get('/api/gatewayType');
}


export function updateDeviceApi(data) {
  return axios.put(`/api/device/${data.id}`, {
    ...data
  });
}

export function addDeviceApi(data) {
  return axios.post(`/api/device`, {...data});
}

export function searchDevicesByDeviceNameApi(data) {
  return axios.get(`/api/device/devicename/${data}`);
}

export function searchDevicesByDeviceIdApi(data) {
  return axios.get(`/api/device/deviceid/${data}`);
}

export function searchGatewaysByGatewayIdApi(data) {
  return axios.get(`/api/gateway/gatewayname/${data}`);
}

export function searchGatewaysByGatewayNameApi(data) {
  return axios.get(`/api/gateway/gatewayid/${data}`);
}


//单个设备
export function getDeviceApi(id) {
  return axios.get(`/api/device/${id}`);
}

//设备数据
export function getDevicesDataApi() {
  return axios.get('/api/deviceData');
}

export function deleteDeviceDataApi(id) {
  return axios.delete(`/api/deviceData/${id}`);
}

export function deleteMultipleDataApi(id) {
  return axios.delete(`/api/multipleDeviceData`, {
    params: {
      ...id
    }
  });
}

export function updateDeviceDataApi(data) {//
  console.log(data);
  return axios.put(`/api/deviceData/${data.id}`, {
    ...data
  });
}

export function addDeviceDataApi(data) {
  return axios.post(`/api/device`, {
    ...data
  });
}

export function searchDeviceDataApi(data) {
  return axios.get('/api/deviceData', {
    params: {
      ...data
    }
  });
}

//监控
export function getDeviceTreeApi(city, factory) {
  return axios.get(`/api/device/tree/${city}/${factory}`);
}

//告警信息
export function getAlarmInformationApi() {
  return axios.get('/api/alarmInfo');
}

export function updateAlarmInformationApi(data) {
  return axios.put(`/api/alarmInformation/${data.id}`, {
    ...data
  });
}

export function handleAllAlarmInformationApi(handleData, id) {
  return axios.post(`/api/alarmInformation`, {
    handleData,
    id: {
      ...id
    }
  });
}

export function searchAlarmInformationApi(data) {
  return axios.get('/api/alarmInformation', {
    params: {
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
export function getRegionalDimensionHistogram(selectedType, selectedSource, time) {
  return axios.get('/api/RegionalDimensionHistogram', {
    selectedType: selectedType,
    selectedSource: selectedSource,
    time: time
  });
}

export function getReportStaticDaithlyPieChart(selectedType, selectedSource, time) {
  return axios.get('/api/RegionalDimensionPieChart', {
    selectedType: selectedType,
    selectedSource: selectedSource,
    time: time
  });
}

// 按月统计
export function getReportStaticMonthlyHistogram(selectedType, selectedSource, time) {
  return axios.get('/api/ReportStaticMonthlyHistogram', {
    selectedType: selectedType,
    selectedSource: selectedSource,
    time: time
  });
}

export function getReportStaticMonthlyPieChart(selectedType, selectedSource, time) {
  return axios.get('/api/ReportStaticMonthlyPieChart', {
    selectedType: selectedType,
    selectedSource: selectedSource,
    time: time
  });
}

// 按资源类别费用统计
export function getReportStaticByCategoryTable(selectedType, selectedSource, time) {
  return axios.get('/api/ReportStaticByCategoryTable', {
    selectedType: selectedType,
    selectedSource: selectedSource,
    time: time
  });
}

export function getReportStaticByCategoryTypeHistogram(selectedType, selectedSource, time) {
  return axios.get('/api/ReportStaticByCategoryTypeHistogram', {
    selectedType: selectedType,
    selectedSource: selectedSource,
    time: time
  });
}

export function getReportStaticByCategorySubClassHistogram(selectedType, selectedSource, time) {
  return axios.get('/api/gReportStaticByCategorySubClassHistogram', {
    selectedType: selectedType,
    selectedSource: selectedSource,
    time: time
  });
}


// 按订阅费用统计
export function getReportStaticBySubscribe(year) {
  return axios.get('/api/ReportStaticBySubscribe', {
    params: {
      year: year
    }
  });
}

// 月度费用报告
export function getReportOfMonthlyExpense() {
  return axios.get('/api/getReportOfMonthlyExpense');
}


export function checkMonthlyReport(order, date) {
  return axios.get('/api/checkMonthlyReport', {
    params: {
      order: order,
      date: date
    }
  });
}

// 用户管理
// 获取所有部门 下拉框要用
export function getAllDepartments() {
  return axios.get(`/api/city`);
}

// crud


export function getUserById(id) {
  return axios.get(`/api/user/${id}`);
}

// 增加新用户
export function createNewUser(userInfo) {
  return axios.post(`/api/user`, {
    ...userInfo
  })
}

// 获取用户信息表，如果没有传参数就是获取全部
export function getUserTable(username, depart) {
  return axios.get('/api/user', {
    params: {
      username: username,
      depart: depart
    }
  });
}

// 删除用户
export function deleteUser(userID) {
  return axios.delete(`/api/user/${userID}`)
}

export function editUser(id, userInfo) {
  return axios.put(`/api/user/${id}`, {
    ...userInfo
  });
}

//  修改用户(一般改权限，传参用户id和权限名的数组)
export function editAuthorities(userID, options) {
  return axios.post(`/api/editAuthorities`, {
    userID,
    options: options
  })
}

export function getAllAuthorities() {
  return axios.get('/api/getAllAuthorities');
}

export function getAuthorities(userID) {
  return axios.get(`/api/getAuthorities/${userID}`)
}

export function getFields() {
  return axios.get(`/api/field`);
}

export function addRule(rule) {
  return axios.post(`/api/threshold`, {...rule});
}

export function getAllRules() {
  return axios.get(`/api/threshold`);
}

export function getCityOptions() {
  return axios.get(`/api/city/cityOptions`);
}

export function getFactoryOptions(cityname) {
  return axios.get(`/api/factory/factoryOptions/${cityname}`);
}

export function getWorkshopOptions(factoryname) {
  return axios.get(`/api/workshop/workshopOptions/${factoryname}`);
}

export function getDeviceByWorkshop(workshop) {
  return axios.get(`/api/device/workshop/${workshop}`);
}

export function getGatewayByWorkshop(workshop) {
  return axios.get(`/api/gateway/workshop/${workshop}`);
}

export function getDeviceAmount() {
  return axios.get(`/api/device/amount`);
}

export function getDashboardAlarmInfo() {
  return axios.get(`/api/alarmInfo/dashboard`);
}

export function getDeviceDataAmount() {
  return axios.get(`/api/deviceData/amount`);
}

export function getAlarmInfoAmount() {
  return axios.get(`/api/alarmInfo/amount`);
}

export function getDeviceStatus(id) {
  return axios.get(`/api/deviceData/status/${id}`);
}

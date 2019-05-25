import Vue from 'vue';
import Router from 'vue-router';
import Home from '../page/Home/index';
import Login from '../page/Login/index';
import Register from '../page/Register/index';
import RegisterSuccess from '../page/RegisterSuccess/index';
// home页组件
import DashBoard from '../container/DashBoard/index';
import RoleManagement from  '../container/RoleManagement/index';
import GatewayEquipment from '../container/GatewayEquipment/index';
import PhysicalDevice from '../container/PhysicalDevice/index';
import EquipmentData from '../container/EquipmentData/index';
import MonitoringConfiguration from '../container/MonitoringConfiguration/index';
import WarningMessage from '../container/WarningMessage/index';
import PersonalInformation from '../container/PersonalInformation/index';
import ReportCenter from '../container/ReportCenter/index';
import ModelTraining from '../container/ModelTraining/index';
import IntelligentAnalysis from '../container/IntelligentAnalysis/index';
import RegionalDimension from  '../container/RegionalDimension';
import TimeDimension from '../container/TimeDimension';
import ReportStaticByCategory from '../container/ReportStaticByCategory';
import ReportStaticBySubscribe from '../container/ReportStaticBySubscribe';
import ReportOfMonthlyExpense from '../container/ReportOfMonthlyExpense';
import DistrictManagement from '../container/DistrictManagement';
import DeviceTypeDimension from  '../container/DeviceTypeDimension';

import {getCookie} from '../../utils/package-cookies';
Vue.use(Router);

const routes=[
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true
      },
      children:[
        {
          path: '/gatewayEquipment',
          name: 'GatewayEquipment',
          component: GatewayEquipment
        },
        {
          path: '/physicalDevice',
          name: 'PhysicalDevice',
          component: PhysicalDevice
        },
        {
          path: '/equipmentData',
          name: 'EquipmentData',
          component: EquipmentData
        },
        {
          path: '/monitoringConfiguration',
          name: 'MonitoringConfiguration',
          component: MonitoringConfiguration
        },
        {
          path: '/warningMessage',
          name: 'WarningMessage',
          component: WarningMessage
        },
        {
          path: '/personalInformation',
          name: 'PersonalInformation',
          component: PersonalInformation
        },
        {
          path: '/reportCenter',
          name: 'ReportCenter',
          component: ReportCenter
        },
        {
          path: '/RegionalDimension',
          name: 'RegionalDimension',
          component: RegionalDimension
        },{
          path: '/TimeDimension',
          name: 'TimeDimension',
          component: TimeDimension
        },
        {
          path:'/ReportStaticByCategory',
          name: 'ReportStaticByCategory',
          component: ReportStaticByCategory
        },
        {
          path:'/ReportStaticBySubscribe',
          name: 'ReportStaticBySubscribe',
          component: ReportStaticBySubscribe
        },
        {
          path:'/ReportOfMonthlyExpense',
          name: 'ReportOfMonthlyExpense',
          component: ReportOfMonthlyExpense
        },
        {
          path: '/modelTraining',
          name: 'ModelTraining',
          component: ModelTraining
        },
        {
          path: '/intelligentAnalysis',
          name: 'IntelligentAnalysis',
          component: IntelligentAnalysis
        },
        {
          path: '/dashBoard',
          name: 'DashBoard',
          component: DashBoard
        },
        {
          path: '/roleManagement',
          name: 'RoleManagement',
          component: RoleManagement

        },
        {
          path: '/districtManagement',
          name: 'DistrictManagement',
          component: DistrictManagement
        },
        {
          path: '/DeviceTypeDimension',
          name: 'DeviceTypeDimension',
          component: DeviceTypeDimension
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/registerSuccess',
      name: 'RegisterSuccess',
      component: RegisterSuccess
    },

  ];

const router = new Router({routes});

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth) {
    // fetch('api/login').then(res => {
    //   if(res.errCode == 200) {
    //     next();
    //   } else {
        if(getCookie('simulate')) {
           next()
        }else {
          next({
            path: '/login'
          });
        }
  } else {
    next();
  }
});
export default router;

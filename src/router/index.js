import Vue from 'vue';
import Router from 'vue-router';
import Home from '../page/Home/index';
import Login from '../page/Login/index';
import Register from '../page/Register/index';
import RegisterSuccess from '../page/RegisterSuccess/index';
import DashBoard from '../container/DashBoard/index';
// home页组件
import GatewayEquipment from '../container/GatewayEquipment/index';
import PhysicalDevice from '../container/PhysicalDevice/index';
import EquipmentData from '../container/EquipmentData/index';
import MonitoringConfiguration from '../container/MonitoringConfiguration/index';
import WarningMessage from '../container/WarningMessage/index';
import PersonalInformation from '../container/PersonalInformation/index';
import ReportCenter from '../container/ReportCenter/index';
import ModelTraining from '../container/ModelTraining/index';
import IntelligentAnalysis from '../container/IntelligentAnalysis/index';

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

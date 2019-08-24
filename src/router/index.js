import Vue from 'vue';
import Router from 'vue-router';
import Home from '../page/Home/index';
import Login from '../page/Login/index';
import Register from '../page/Register/index';
import RegisterSuccess from '../page/RegisterSuccess/index';
// home页组件
import DashBoard from '../container/DashBoard/index';
import RoleManagement from '../container/RoleManagement/index';
import GatewayEquipment from '../container/GatewayEquipment/index';
import PhysicalDevice from '../container/PhysicalDevice/index';
import EquipmentData from '../container/EquipmentData/index';
import MonitoringConfiguration from '../container/MonitoringConfiguration/index';
import WarningMessage from '../container/WarningMessage/index';
import WarningRule from '../container/WarningRule/index';
import PersonalInformation from '../container/PersonalInformation/index';
import ReportCenter from '../container/ReportCenter/index';
import ModelTraining from '../container/ModelTraining/index';
import IntelligentAnalysis from '../container/IntelligentAnalysis/index';
import RegionalDimension from '../container/RegionalDimension';
import TimeDimension from '../container/TimeDimension';
import ReportStaticByCategory from '../container/ReportStaticByCategory';
import ReportStaticBySubscribe from '../container/ReportStaticBySubscribe';
import ReportOfMonthlyExpense from '../container/ReportOfMonthlyExpense';
import DistrictManagement from '../container/DistrictManagement';
import DeviceTypeDimension from '../container/DeviceTypeDimension';
import TagDimension from '../container/TagDimension';
import RegionalConfig from '../container/RegionalConfig';
import SystemConfig from '../container/SystemConfig';

import {getCookie} from '../../utils/package-cookies';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '/gatewayEquipment',
        name: 'GatewayEquipment',
        component: GatewayEquipment,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/physicalDevice',
        name: 'PhysicalDevice',
        component: PhysicalDevice,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/equipmentData',
        name: 'EquipmentData',
        component: EquipmentData,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/monitoringConfiguration',
        name: 'MonitoringConfiguration',
        component: MonitoringConfiguration,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/warningMessage',
        name: 'WarningMessage',
        component: WarningMessage,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/warningRule',
        name: 'WarningRule',
        component: WarningRule,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/personalInformation',
        name: 'PersonalInformation',
        component: PersonalInformation,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/reportCenter',
        name: 'ReportCenter',
        component: ReportCenter,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/RegionalDimension',
        name: 'RegionalDimension',
        component: RegionalDimension,
        meta: {
          requireAuth: true
        },
      }, {
        path: '/TimeDimension',
        name: 'TimeDimension',
        component: TimeDimension,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/ReportStaticByCategory',
        name: 'ReportStaticByCategory',
        component: ReportStaticByCategory,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/ReportStaticBySubscribe',
        name: 'ReportStaticBySubscribe',
        component: ReportStaticBySubscribe,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/ReportOfMonthlyExpense',
        name: 'ReportOfMonthlyExpense',
        component: ReportOfMonthlyExpense,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/modelTraining',
        name: 'ModelTraining',
        component: ModelTraining,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/intelligentAnalysis',
        name: 'IntelligentAnalysis',
        component: IntelligentAnalysis,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/dashBoard',
        name: 'DashBoard',
        component: DashBoard,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/roleManagement',
        name: 'RoleManagement',
        component: RoleManagement,
        meta: {
          requireAuth: true
        },

      },
      {
        path: '/districtManagement',
        name: 'DistrictManagement',
        component: DistrictManagement,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/DeviceTypeDimension',
        name: 'DeviceTypeDimension',
        component: DeviceTypeDimension,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/TagDimension',
        name: 'TagDimension',
        component: TagDimension,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/RegionalConfig',
        name: 'RegionalConfig',
        component: RegionalConfig,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/SystemConfig',
        name: 'SystemConfig',
        component: SystemConfig,
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requireAuth: false
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requireAuth: false
    },
  },
  {
    path: '/registerSuccess',
    name: 'RegisterSuccess',
    component: RegisterSuccess,
    meta: {
      requireAuth: false
    },
  },

];

const router = new Router({routes});

// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth||typeof to.meta.requireAuth==='undefined') {// 需要鉴权，或者未配置的路由
//     if (localStorage.getItem('userInfo')) {
//       if (to.path === '/login') {
//
//       }
//       next();
//     } else {
//       if (to.path === '/login') {
//         next();
//       } else {
//         next({
//           path: '/login'
//         });
//       }
//     }
//   }
//   else {
//     next();
//   }
// });
export default router;

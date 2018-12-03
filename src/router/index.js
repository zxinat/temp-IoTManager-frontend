import Vue from 'vue'
import Router from 'vue-router'
import Home from '../container/Home/index'
import Login from '../container/Login/index'
import Register from '../container/Register/index'
import RegisterSuccess from '../container/RegisterSuccess/index'
Vue.use(Router)

const routes=[
    {
      path: '/',
      name: 'Home',
      component: Home,
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

// router.beforeEach((to, from, next) => {
//   if(to.meta.requireAuth) {
//     fetch('api/login').then(res => {
//       if(res.errCode == 200) {
//         next();
//       } else {
//         if(getCookie('session')) {
//           delCookie('session');
//         }
//         if(getCookie('u_uuid')) {
//           delCookie('u_uuid');
//         }
//         next({
//           path: '/login'
//         });
//       }
//     });
//   } else {
//     next();
//   }
// });
export default router;

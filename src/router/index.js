import Vue from 'vue'
import Router from 'vue-router'
import Home from '../container/Home/index'
import Login from '../container/Login/index'
import Register from '../container/Register/index'
import RegisterSuccess from '../container/RegisterSuccess/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
  ]
})

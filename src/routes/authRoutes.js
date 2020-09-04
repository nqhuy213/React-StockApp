import Login from '../containers/Login/Login'
import Register from '../containers/Register/Register'

export default{
  Login:{
    component: Login,
    path: '/auth/login'
  },
  Register:{
    component: Register,
    path: '/auth/register'
  }
}
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Confirmation from '../views/Confirmation'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/connexion',
    name: 'Login',
    component: Login
  },
  {
    path: '/myprofile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: Confirmation
  }
]

const router = new VueRouter({
  routes
})

export default router

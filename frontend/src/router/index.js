import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Message from '../components/Message.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/homepage',
    name: 'Home',
    component: Home
  },
  {
    path: '/myprofile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/postmessage',
    name: 'Message',
    component: Message
  }
]

const router = new VueRouter({
  routes
})

// Check for unauthorized access and action
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/connexion')
  } else {
    next()
  }
})

export default router

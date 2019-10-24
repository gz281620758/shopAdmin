import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import Login from '../components/Login.vue'
import User from '../components/user.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  { path: '/index',
    component: Index,
    children: [
      { path: '/user', name: 'user', component: User }
    ]

  },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})
export default router

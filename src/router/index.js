import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import Login from '../components/Login.vue'
import User from '../components/user.vue'
import Rights from '../components/Rights.vue'
import Roles from '../components/Roles.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  { path: '/index',
    component: Index,
    children: [
      { path: '/user', name: 'user', component: User },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles }
    ]

  },
  { path: '/login', component: Login }

]

const router = new VueRouter({
  routes
})
// 解决重复点击同意个路由报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})
export default router

import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import router from './router'
import axios from 'axios'
Vue.config.productionTip = false
// 在Vue的原型中定义一个$axios属性
// 以后要使用axios直接使用this.$axios
Vue.prototype.$axios = axios

// 配置axios默认基准地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  response = response.data
  // 校验结果, 如果响应时, 发现状态码是401, 说明是无效token, 拦截到登录
  if (response.meta.status === 401) {
    router.push('/login')
    response.meta.msg = '登录已过期，请重新登陆！'
  }
  // console.log(response)
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

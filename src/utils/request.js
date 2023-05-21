import axios from 'axios'
// 引入vuex
import store from '@/store'
// 引入路由
import router from '@/router'

const service = axios.create({

  // 基地址
  baseURL: process.env.VUE_APP_BASE_API,

  // 请求超时的等待时间
  timeout: 5000

})

// 请求拦截器
service.interceptors.request.use(config => {
  const token = store.state.user.token
  if (token) {
    // 在请求头中加入token
    config.headers['Authorization'] = `Bearer ` + token
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  if (response.data.success) {
    // 对代码进行劫持
    return response.data
  } else {
    return Promise.reject(new Error('请求错误'))
  }
},
async error => {
  // console.log(error.response.data.code)
  // 返回执行错误
  if (error.response.data.code === 10002) {
    // token过期，退出登录，情况token，清空个人信息
    await store.dispatch('user/logout')
    router.push('/login?return_url=' + router.currentRoute.fullPath)
  }
  return Promise.reject('请求出错了', error)
})

export default service

import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

// 按钮级权限控制-自定义指令
Vue.directive('allow', {
  inserted: function(el, binding) {
    const points = store.state.user.userInfo.roles.points
    if (points.includes(binding.value)) {
      console.log(111)
      el.style.display = 'none'
    } else {
      console.log(222)
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

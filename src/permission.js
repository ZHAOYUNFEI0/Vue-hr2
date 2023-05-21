import router from './router'
import store from '@/store'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 白名单
const whiteList = ['/login', '/404']

/**
 * 全局前置路由守卫
 * to：要去哪个页面
 * from：从哪个页面来
 * next：放行
 */
router.beforeEach(async(to, from, next) => {
  // 开启进度条
  NProgress.start()
  const token = store.state.user.token
  if (token) {
    //   如果有token 去的页面是登录页面，跳转到首页
    if (to.path === '/login') {
      NProgress.done()
      next('/')
    } else {
      // 登录成功获取用户信息
      await store.dispatch('user/getUserInfo')
      next()
    }
  } else {
    //   如果没有token 去的页面是登录页，同意跳转，如果是其他页面，强制跳转到登录页面
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

// 路由后置守卫 跳转完成后
// 跳转成功后关闭 进度条
router.afterEach(() => {
  NProgress.done()
})


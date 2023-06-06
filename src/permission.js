import router from './router'
import store from '@/store'
import { asyncRoutes } from '@/router/index'

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
    // 登录成功获取用户信息
    if (!store.state.user.userInfo.id) {
      // 用户可以访问的页面

      const menus = await store.dispatch('user/getUserInfo')
      console.log(store.state.user.userInfo)
      // console.log(menus)
      const filterRoutes = asyncRoutes.filter(item => {
        // 遍历拿到每个动态路由的name
        const roueName = item.children[0].name
        // 去 menus 中找到可以访问的路由，筛选到新数组中
        return menus.includes(roueName)
      })

      // 只要使用 addRoutes 动态添加的路由，就不会自动生成侧边菜单栏
      // filterRoutes.push({ path: '*', redirect: '/404', hidden: true })
      router.addRoutes([...filterRoutes, { path: '*', redirect: '/404', hidden: true }])

      // 将筛选好的动态路由保存到 vuex 中，左侧菜单栏
      store.commit('menu/setMenuList', filterRoutes)
      next(to)
    }
    //   如果有token 去的页面是登录页面，跳转到首页
    if (to.path === '/login') {
      NProgress.done()
      next('/')
    } else {
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
router.afterEach((to, from, next) => {
  // console.log(to)
  document.title = '人资 -' + to.meta.title
  NProgress.done()
})


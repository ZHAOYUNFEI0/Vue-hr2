// 导入静态路由
import { constantRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    // 先以静态路由作为菜单数据的初始值
    menuList: [...constantRoutes]
  },
  mutations: {
    setMenuList(state, asyncRoutes) {
      // 将动态路由和静态路由组合起来
      state.menuList = [...constantRoutes, ...asyncRoutes]
    }
  }
}

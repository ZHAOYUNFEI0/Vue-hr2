import Vue from 'vue'
import Router from 'vue-router'

// 导入动态路由表
import departments from '@/router/modules/departments.js'
import employees from '@/router/modules/employees'
import settings from '@/router/modules/settings'
import salarys from '@/router/modules/salarys'
import social_securitys from '@/router/modules/social_securitys'
import attendances from '@/router/modules/attendances'
import approvals from '@/router/modules/approvals'
import permissions from '@/router/modules/permissions'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 动态路由表
export const asyncRoutes = [
  // 加载组织架构的时候，先加载layout，在加载他的子路由
  departments,
  employees,
  settings,
  salarys,
  social_securitys,
  attendances,
  approvals,
  permissions
]

// 静态路由表
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  // 匹配不到 跳转到404
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // 合并动态路由和静态路由
  routes: [...constantRoutes, ...asyncRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

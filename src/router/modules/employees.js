import Layout from '@/layout'
// Layout组件中包含
export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employees/employees.vue'),
      meta: { title: '员工管理', icon: 'user' }
    },
    {
      path: 'detail',
      name: 'detail',
      component: () => import('@/views/employees/detail.vue'),
      hidden: true
    }
  ]
}


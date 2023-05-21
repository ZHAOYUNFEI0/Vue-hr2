import Layout from '@/layout'
// Layout组件中包含
export default {
  path: '/permissions',
  component: Layout,
  children: [{
    path: '',
    name: 'Permissions',
    component: () => import('@/views/permissions/permissions.vue'),
    meta: { title: '权限管理', icon: 'password' }
  }]
}

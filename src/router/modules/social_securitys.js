import Layout from '@/layout'
// Layout组件中包含
export default {
  path: '/social_securitys',
  component: Layout,
  children: [{
    path: '',
    name: 'Social_securitys',
    component: () => import('@/views/social_securitys/social_securitys.vue'),
    meta: { title: '社保管理', icon: 'table' }
  }]
}

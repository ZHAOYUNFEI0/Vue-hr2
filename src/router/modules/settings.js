import Layout from '@/layout'
// Layout组件中包含
export default {
  path: '/settings',
  component: Layout,
  children: [{
    path: '',
    name: 'settings',
    component: () => import('@/views/settings/settings.vue'),
    meta: { title: '公司设置', icon: 'nested' }
  }]
}

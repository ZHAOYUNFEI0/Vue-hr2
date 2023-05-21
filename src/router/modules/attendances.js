import Layout from '@/layout'
// Layout组件中包含
export default {
  path: '/attendances',
  component: Layout,
  children: [{
    path: '',
    name: 'Attendances',
    component: () => import('@/views/attendances/attendances.vue'),
    meta: { title: '考勤管理', icon: 'form' }
  }]
}

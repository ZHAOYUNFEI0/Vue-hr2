import Layout from '@/layout'
// Layout组件中包含
export default {
  path: '/approvals',
  component: Layout,
  children: [{
    path: '',
    name: 'Approvals',
    component: () => import('@/views/approvals/approvals.vue'),
    meta: { title: '审批管理', icon: 'table' }
  }]
}

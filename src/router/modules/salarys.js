import Layout from '@/layout'
// Layout组件中包含
export default {
  path: '/salarys',
  component: Layout,
  children: [{
    path: '',
    name: 'salarys',
    component: () => import('@/views/salarys/salarys.vue'),
    meta: { title: '工资管理', icon: 'example' }
  }]
}

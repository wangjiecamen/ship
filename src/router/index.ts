import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: 'law-search',
        component: () => import('@/views/law-search/index.vue')
      },
      {
        path: '/error-handler',
        component: () => import('@/views/error-handler/index.vue'),
        children: [
          {
            path: 'operation-error',
            component: () => import('@/views/error-handler/OperationError.vue'),
            meta: { title: '操作故障' }
          },
          {
            path: 'screen-alarm',
            component: () => import('@/views/error-handler/ScreenAlarm.vue'),
            meta: { title: '触摸屏报警' }
          },
          {
            path: 'screen-alarm/detail',
            component: () => import('@/views/error-handler/ScreenAlarmDetail.vue'),
            meta: { title: '' }
          },
          {
            path: 'operation-error/detail',
            component: () => import('@/views/error-handler/OperationErrorDetail.vue'),
            meta: { title: '' }
          }
        ]
      },
      {
        path: 'operation-guide',
        component: () => import('@/views/operation-guide/index.vue'),
        children: [
          {
            path: 'entry',
            component: () => import('@/views/operation-guide/Entry.vue'),
            meta: { title: '工况选择' }
          }
        ]
      },
      {
        path: '/attention',
        component: () => import('@/views/attention/index.vue'),
        children: [
          {
            path: 'entry',
            component: () => import('@/views/attention/Entry.vue'),
            meta: { title: '操作流程' }
          },
          {
            path: 'auto',
            component: () => import('@/views/attention/Entry.vue'),
            meta: { title: '自动操作' }
          },
          {
            path: 'handwork',
            component: () => import('@/views/attention/Entry.vue'),
            meta: { title: '手动操作' }
          }
        ]
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

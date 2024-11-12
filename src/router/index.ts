import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout.vue'
import { useUserStore } from '@/store/user.ts'

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
            path: 'operation-error/tilt',
            component: () => import('@/views/error-handler/Tilt.vue'),
            meta: { title: '' }
          },
          {
            path: 'operation-error/0-28',
            component: () => import('@/views/error-handler/BoltCannotPullout.vue'),
            meta: { title: '' }
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
          },
          {
            path: 'detail',
            component: () => import('@/views/operation-guide/Detail.vue'),
            meta: { title: '' }
          },
          {
            path: 'lift',
            component: () => import('@/views/operation-guide/Lift.vue'),
            meta: { title: '' }
          },
          {
            path: 'preload',
            component: () => import('@/views/operation-guide/Preload.vue'),
            meta: { title: '' }
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
            meta: { title: '工况选择' }
          },
          {
            path: 'detail',
            component: () => import('@/views/attention/Detail.vue'),
            meta: { title: '' }
          },

        ]
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const useUser = useUserStore()

  if (!useUser.user && to.path !== '/') {
    useUser.showLogin = true
    next('/')
  } else {
    next()
  }
})
export default router

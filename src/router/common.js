import { h, resolveComponent } from 'vue'

const commonRoutes = [
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
      },
      {
        path: 'permission',
        name: 'PagePermission',
        component: () => import('@/views/pages/PagePermission'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Page404' }
  }
]

export const commonPublicPages = [
  'CommonLogin',
  'CommonRequestPassword',
  'CommonResetPassword',
]

export default commonRoutes

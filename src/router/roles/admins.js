export const adminRoutes = (DefaultLayout) => [
  {
    path: '/',
    name: 'HotelHome',
    redirect: '/admin',
  },
  {
    path: '/login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/auth/Login'),
  },
  {
    path: '/request-password',
    name: 'AdminRequestPassword',
    component: () => import('@/views/admin/auth/RequestPassword'),
  },
  {
    path: '/reset-password',
    name: 'AdminResetPassword',
    component: () => import('@/views/admin/auth/ResetPassword'),
  },
  {
    path: '/logout',
    name: 'AdminLogout',
  },
  {
    path: '/hotel',
    name: 'HotelHome',
    component: DefaultLayout,
    redirect: '/hotels',
    children: [
      {
        path: '/hotels',
        name: 'HotelList',
        component: () => import('@/views/admin/hotels/List.vue'),
      },
      {
        path: '/hotels/create',
        name: 'HotelCreate',
        component: () => import('@/views/admin/hotels/Create.vue'),
      },
      {
        path: '/hotels/edit/:id',
        name: 'HotelUpdate',
        component: () => import('@/views/admin/hotels/Create.vue'),
      },
      {
        path: '/accounts',
        name: 'ListAccount',
        component: () => import('@/views/admin/admins/List.vue'),
      },
      {
        path: '/account',
        name: 'AccountSetting',
        redirect: '/accounts',
        children: [
          {
            path: '/accounts/create',
            name: 'CreateAccount',
            component: () => import('@/views/admin/admins/Create.vue'),
          },
          {
            path: '/accounts/edit/:id',
            name: 'UpdateAccount',
            component: () => import('@/views/admin/admins/Create.vue'),
          },
        ],
      },
      {
        path: '/transmission-logs',
        name: 'TransmissonLogs',
        component: () => import('@/views/admin/transmissions/List.vue'),
      },
    ],
  },
]

export const adminPublicPages = [
  'AdminLogin',
  'AdminRequestPassword',
  'AdminResetPassword',
]

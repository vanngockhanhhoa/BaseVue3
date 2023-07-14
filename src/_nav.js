export default [
  {
    component: 'CNavGroup',
    name: 'hotel_management',
    icon: 'cil-building',
    items: [
      {
        component: 'CNavItem',
        name: 'hotel_list',
        routeName: 'HotelList',
        to: '/hotels',
      },
      {
        component: 'CNavItem',
        name: 'hotel_add',
        routeName: 'HotelCreate',
        to: '/hotels/create',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'account_management',
    icon: 'cib-opsgenie',
    items: [
      {
        component: 'CNavItem',
        name: 'account_setting',
        routeName: 'ListAccount',
        to: '/accounts',
      },
      {
        component: 'CNavItem',
        name: 'account_add_new',
        routeName: 'CreateAccount',
        to: '/accounts/create',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'transmission_management',
    routeName: 'TransmissonLogs',
    to: '/transmission-logs',
    icon: 'cil-swap-horizontal',
  },

  // BLOCK MASTER NAV
  // {
  //   component: 'CNavTitle',
  //   name: 'block_heading',
  // },

  // {
  //   component: 'CNavGroup',
  //   name: 'block_account',
  //   icon: 'cib-buffer',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'admin_management',
  //       routeName: 'AdminList',
  //       to: '/admin/admins',
  //       icon: 'cib-opsgenie',
  //     },
  //   ],
  // },
]

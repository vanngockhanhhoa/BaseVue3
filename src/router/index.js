import {createRouter, createWebHistory} from 'vue-router'
import commonRoutes, {commonPublicPages} from './common'
import {adminRoutes, adminPublicPages} from './roles/admins'
import {isAvailableRoute} from '@/utils/roleCheck'
import {ACCESS_TOKEN_KEY, ACTOR_REDIRECTS, USER_INFO_KEY} from '@/config/consts'
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import qs from 'qs';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  mode: 'history',
  base: '/',
  routes: [
    ...commonRoutes,
    ...adminRoutes(DefaultLayout),
  ],

  scrollBehavior() {
    return {top: 0}
  },
  parseQuery(query) {
    return qs.parse(query);
  },
  stringifyQuery(query) {
    var result = qs.stringify(query);
    return result ? (result) : '';
  }
})

router.beforeEach(async (to) => {
  let pathAccess = setPathAccess(to)
  if (!localStorage.getItem('pathAccess') || to.path.includes('/login')) {
    localStorage.setItem('pathAccess', pathAccess);
  }
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  let user = JSON.parse(localStorage.getItem(USER_INFO_KEY))
  const role = user?.role || null
  const routeName = to.name

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = [...commonPublicPages, ...adminPublicPages]
  const authRequired = !publicPages.includes(routeName)

  // redirect to login if error 401 or can't access URL
  if (authRequired && !accessToken) {

    if (pathAccess) {
      return ACTOR_REDIRECTS[pathAccess]
    }
    if (role) {
      return ACTOR_REDIRECTS[role]
    }
  }

  if (authRequired && !isAvailableRoute(routeName) && routeName != 'PagePermission') {
    return '/pages/permission'
  }
})

function setPathAccess(to){
  let path = to.path
  const paths = ['admin', 'clean', 'customer'];
  let pathAccess = 'common_login';

  for (let indx in paths) {
    if(path.includes(paths[indx])){
      pathAccess = paths[indx];
      break;
    }
  }
  return pathAccess
}

export default router

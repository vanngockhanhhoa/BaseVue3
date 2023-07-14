import { adminRoutes } from '@/router/roles/admins'
import commonRoutes from '@/router/common'
import { USER_INFO_KEY, ACCESS_TOKEN_KEY } from '@/config/consts'
import DefaultLayout from "@/layouts/DefaultLayout.vue"

export const isAvailableRoute = (routeName) => {
  const user = JSON.parse(localStorage.getItem(USER_INFO_KEY))
  if (user == null) {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    return false
  }
  switch (user.role) {
    case 'admin':
      return isAvailableAdminRoute(user, routeName)
    default:
      return false
  }
}

function isRouteInlist(routeList, routeName) {
  let found = false
  routeList.forEach((route) => {
    if (routeName == route.name) {
      found = true
    }
    if (route.children) {
      if (isRouteInlist(route.children, routeName)) {
        found = true
      }
    }
  })
  return found
}

function isAvailableAdminRoute(user, routeName) {

  // check route with each type (actor)
  let isExist
  // switch (user.type) {
  //   case USER_TYPES.ADMIN: // USER_TYPES.ADMIN = USER_TYPES.WAREHOUSE
  //     //User is admin + warehosue
  //     isExist = isRouteInlist([...commonRoutes, ...adminRoutes(DefaultLayout)], routeName)
  //     break;
  // }

  isExist = isRouteInlist([...commonRoutes, ...adminRoutes(DefaultLayout)], routeName)

  // if route not exists
  if (!isExist) {
    return false
  }

  return true
}

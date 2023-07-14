import {USER_INFO_KEY, ACCESS_TOKEN_KEY, EXPIRED_TIME_SESSION} from '@/config/consts'
import dayjs from 'dayjs'

export default {
  install: (app) => {
    class Auth {
      constructor() {
        this.$cookies = app.config.globalProperties.$cookies
        this.user = this.getUser()
      }

      login(user, accessToken) {
        if (!!accessToken && !!user) {
          localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
          const expiredTimeSession = dayjs().add(1, 'hour').unix()
          localStorage.setItem(EXPIRED_TIME_SESSION, expiredTimeSession)
          localStorage.setItem(USER_INFO_KEY, JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          }))
          return true
        }
        return false
      }

      getUser() {
        return JSON.parse(localStorage.getItem(USER_INFO_KEY))
      }

      isLoggedIn() {
        return !!localStorage.getItem(ACCESS_TOKEN_KEY)
      }

      logout() {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(USER_INFO_KEY)
        localStorage.removeItem(EXPIRED_TIME_SESSION)
        this.user = null
      }
    }

    const auth = new Auth()
    app.config.globalProperties.$auth = auth
    app.$auth = auth
  },
}

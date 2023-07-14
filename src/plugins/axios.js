import { useCommonsStore } from '@/store/useCommonsStore'
import { HTTP_CODE } from '../config/apis'
import {ACCESS_TOKEN_KEY, ACTOR_REDIRECTS, TOKEN_EXPIRED, USER_INFO_KEY} from '@/config/consts'

const baseURL = process.env.VUE_APP_API_URL

export default {
  install: (app) => {
    const commonsStore = useCommonsStore()

    const axiosPlugin = app.axios.create({
      baseURL: baseURL,
    })

    axiosPlugin.interceptors.response.use(
      (response) => {
        commonsStore.loading = false
        return response
      },

      async (error) => {
        commonsStore.loading = false
        const code = parseInt(error.response && error.response.status)
        const pathAccess = localStorage.getItem('pathAccess')
        const role = JSON.parse(localStorage.getItem(USER_INFO_KEY))?.role

        const logout = () => {
          app.$auth.logout()
          if (!window.location.href.includes('login')) {
            if (pathAccess) {
              return window.location.href = ACTOR_REDIRECTS[pathAccess]
            }
            window.location.href = ACTOR_REDIRECTS[role]
          }
        }

        const setInfoAccount = (user) => {
          localStorage.setItem(USER_INFO_KEY, JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          }))
        }

        switch (code) {
          case HTTP_CODE.HTTP_UNPROCESSABLE_ENTITY: {
            return Promise.reject(error.response.data)
          }
          case HTTP_CODE.HTTP_NOT_FOUND: {
            // not found - show page
            return Promise.reject(error.response.data)
          }
          case HTTP_CODE.HTTP_BAD_REQUEST: {
            // app.$toast.error(i18n.t('messages.common.wrong_URL'))
            // return
            // app.$toast.error(error.response.data.message)
            // return Promise.reject(error.response.data.message)
            return Promise.reject(error.response.data)
          }
          case HTTP_CODE.HTTP_UNAUTHORIZED: {
            let errorMessage = error.response?.data?.message

            //refresh token
            if (errorMessage == TOKEN_EXPIRED) {
              const originalRequest = error.config;
              const jwtToken = localStorage.getItem(ACCESS_TOKEN_KEY);
              try {
                const res = await app.axios.post(baseURL + "/admins/auth/refresh-token", {
                  token: jwtToken,
                });
                const token = res.data.results.access_token
                localStorage.setItem(ACCESS_TOKEN_KEY, token);

                return axiosPlugin
                  .request({
                    ...originalRequest,
                    headers: {
                      ...originalRequest.headers,
                      Authorization: `Bearer ${token}`
                    }
                  })
              } catch (error) {
                logout()
                app.$toast.error(errorMessage)
                return Promise.reject();
              }
            } else {
              logout()
              app.$toast.error(errorMessage)
              return Promise.reject()
            }
          }
          case HTTP_CODE.HTTP_FORBIDDEN: {
            app.$toast.error(error.response.data.message)
            logout()
            return Promise.reject();
          }
          case HTTP_CODE.HTTP_METHOD_NOT_ALLOWED: {
            setInfoAccount(error.response.data.user)
            app.$toast.error(error.response.data.message)
            window.location.href = '/pages/dashboard'
            return Promise.reject();
          }
          case HTTP_CODE.HTTP_TOO_MANY_REQUESTS: {
            return Promise.reject(error.response.data)
          }
          case HTTP_CODE.HTTP_TRANSACTION_ERROR: {
            return Promise.reject(error.response.data)
          }
          default: {
            if (error.code === 'ERR_NETWORK') {
              app.$toast.error(app.config.globalProperties.$t('messages.common.no_response'))
              return Promise.reject()
            } else {
              return Promise.reject(error)
            }
          }
        }
      },
    )

    axiosPlugin.interceptors.request.use(
      (config) => {
        commonsStore.loading = true
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${localStorage.getItem(
            ACCESS_TOKEN_KEY,
          )}`
        }
        return config
      },
      (error) => {
        commonsStore.loading = false
        this.$toast.error(this.$t('common.error'))
        return Promise.reject(error)
      },
    )

    app.config.globalProperties.$axios = axiosPlugin
    app.$axios = axiosPlugin
  },
}

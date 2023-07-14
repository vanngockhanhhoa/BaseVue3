<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <loading :active="loading" :is-full-page="false"></loading>
      <CRow class="justify-content-center">
        <CCol :md="8" :lg="6" :xl="5" :xs="12">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <vee-form @submit="handleLogin">
                  <h1 class="text-center label-login-screen">
                    {{ $t('auth.login') }}
                  </h1>
                  <CRow>
                    <CCol :xs="12" class="mb-2">
                      <label class="form-label label-login-screen"
                      >{{ $t('login.email')
                        }}<span class="required">*</span></label
                      >
                      <vee-field
                        name="login.email"
                        id="email"
                        class="form-control"
                        type="text"
                        autocomplete="email"
                        v-model="user.email"
                        :rules="
                          'required|email:' +
                          $t('admins.email') +
                          ',abc@gmail.com'
                        "
                        ref="firstFocus"
                      />
                      <ErrorMessage name="login.email" />
                    </CCol>
                  </CRow>
                  <CRow class="mb-3">
                    <CCol :xs="12" class="mb-3">
                      <label class="form-label label-login-screen"
                      >{{ $t('login.password')
                        }}<span class="required">*</span></label
                      >
                      <vee-field
                        name="login.password"
                        id="password"
                        class="form-control"
                        type="password"
                        autocomplete="email"
                        v-model="user.password"
                        rules="required"
                      />
                      <ErrorMessage name="login.password" />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol :xs="12" :md="12">
                      <input
                        name="status"
                        class="form-check-input mr-10"
                        type="checkbox"
                        v-model="user.rememberMe"
                        value="0"
                      />
                      <label class="form_label cursor_auto">{{
                          $t('auth.remember_me')
                        }}</label>
                    </CCol>
                    <CCol :xs="12" :md="12" class="text-center forgot_password">
                      <CLink href="/request-password">
                        <CButton color="link" class="px-0">
                          {{ $t('auth.forgot_password') }}
                        </CButton>
                      </CLink>
                    </CCol>
                    <CCol :xs="12" :md="12">
                      <div class="d-grid gap-2">
                        <CButton
                          size="lg"
                          color="primary"
                          class="px-4 btn btn-primary btn-action btn-login"
                          type="submit"
                        >
                          {{ $t('auth.login') }}
                        </CButton>
                      </div>
                    </CCol>
                  </CRow>
                </vee-form>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import Loading from 'vue3-loading-overlay'
import { mapState,  mapActions } from 'pinia'
import { useCommonsStore } from '@/store/useCommonsStore'

export default {
  name: 'Login',
  components: {
    Loading,
  },
  data: () => ({
    user: {
      email: '',
      password: '',
      rememberMe: false,
    },
  }),
  computed: {
    ...mapState(useCommonsStore, ['loading'])
  },
  mounted() {
    const firstFocus = this.$refs.firstFocus
    if (firstFocus?.focus) {
      firstFocus?.focus()
    } else {
      firstFocus?.$el.focus()
    }
    if (this.$auth.isLoggedIn()) {
      this.$router.push({ name: 'HotelHome' })
    }
  },
  created() {
    const savedEmail = this.$cookies.get('user.email');
    const savedPassword = this.$cookies.get('user.password');
    if (savedEmail) {
      this.user.email = savedEmail.replace('/', '');
      this.user.password = savedPassword.replace('/', '');
    }
  },
  methods: {
    ...mapActions(useCommonsStore, ['setUserInfo']),
    async handleLogin() {
      this.$repositories.auth
        .login(this.user)
        .then((response) => {
          const { profile, access_token } = response.data.results
          this.$auth.login({ ...profile, role: 'admin' }, access_token)
          this.$toast.success(this.$t('messages.auth.login_success'))
          if(this.user.rememberMe){
            this.$cookies.set('user.email', this.user.email, { expires: '30d' })
            this.$cookies.set('user.password', this.user.password, { expires: '30d' })
          }
          this.$router.push({ name: 'HotelHome' })
          this.setUserInfo(profile)
        })
        .catch((err) => {
          if (err?.message) {
            this.$toast.error(err.message)
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.card-body {
  min-height: auto;
}
</style>

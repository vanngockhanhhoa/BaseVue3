<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <loading :active="fetching" :is-full-page="false"></loading>
      <CRow class="justify-content-center" v-if="loaded">
        <CCol :md="8" :lg="6" :xl="5" :xs="12">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <vee-form @submit="handleUpdate">
                  <h2 class="text-center label-login-screen">{{ $t('auth.update_password') }}</h2>
                  <div v-if="!updated">
                    <CRow>
                      <CCol :xs="12" class="mb-2">
                        <label class="form-label label-login-screen">
                          {{ $t('login.new_password') }}<span class="required">*</span>
                        </label>
                        <vee-field
                          name="password"
                          class="form-control"
                          type="password"
                          v-model="user.password"
                          :rules="'required|min: 8,' + $t('login.new_password') + '|password'"
                          label="login.new_password"
                          maxlength="16"
                          id="firstFocus"
                        />
                        <ErrorMessage name="password"/>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol :xs="12" class="mb-2">
                        <label class="form-label label-login-screen">
                          {{ $t('login.new_password_confirmation') }}<span class="required">*</span>
                        </label>
                        <vee-field
                          name="password_confirmation"
                          class="form-control"
                          type="password"
                          v-model="user.password_confirmation"
                          :rules="'required|confirmed:@password,' + $t('login.new_password_confirmation') + ',' + $t('login.new_password')"
                          label="login.new_password_confirmation"
                          maxlength="16"
                        />
                        <ErrorMessage name="password_confirmation"/>
                      </CCol>
                    </CRow>
                    <br><br>
                    <CRow>
                      <CCol :xs="12" class="text-center">
                        <CButton
                          size="lg"
                          color="primary"
                          class="btn-action btn-login"
                          type="submit"
                        >
                          {{ $t('auth.update_password') }}
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                  <div v-else class="text-center">
                    <p v-if="tokenInactive">{{ $t('messages.common.wrong_URL') }}</p>
                    <p v-else>{{ $t('auth.password_updated') }}</p>
                    <CLink :href="getURLRedirectByActor('admin')">
                      <CButton color="link" class="px-0">
                        {{ $t('auth.back_to_login') }}
                      </CButton>
                    </CLink>
                  </div>
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
import {useRoute} from 'vue-router'

import Loading from 'vue3-loading-overlay'
import { getURLRedirectByActor } from "@/utils/functions"

export default {
  components: {
    Loading,
  },
  name: 'ResetPassword',
  data: () => ({
    user: {
      token: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    updated: false,
    loaded: false,
    fetching: false,
    tokenInactive: false,
    getURLRedirectByActor,
  }),
  mounted() {
    const route = useRoute()
    const {token, email} = route.query
    this.user.token = token
    this.user.email = email ? email.replace(' ', '+') : ''
    this.$repositories.auth.activateAccount(this.user).catch(() => {
      this.updated = true
      this.tokenInactive = true
    }).finally(() => {
      this.loaded = true
      this.$nextTick(() => {
        document.getElementById('firstFocus').focus()
      })
    })
  },
  methods: {
    async handleUpdate() {
      this.fetching = true
      this.$repositories.auth
        .resetPassword(this.user)
        .then(() => {
          this.updated = true
        })
        .catch((error) => {
          this.$toast.error(error.message)
        }).finally(() => {
        this.fetching = false
      })
    },
  },
}
</script>

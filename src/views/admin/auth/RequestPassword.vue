<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <loading :active="fetching" :is-full-page="false"></loading>
      <CRow class="justify-content-center">
        <CCol :md="8" :lg="6" :xl="5" :xs="12">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <vee-form @submit="handleSendMail">
                  <h2 class="text-center label-login-screen">{{ $t('auth.request_password') }}</h2>
                  <h6 class="text-center mb-4" v-if="!mailSent">{{ $t('auth.guide_reset_password') }}</h6>
                  <div v-if="!mailSent">
                    <CRow>
                      <CCol :xs="12" class="mb-2">
                        <label class="form-label label-login-screen">{{
                            $t('login.email')
                          }}<span class="required">*</span></label>
                        <vee-field
                          name="login.email"
                          id="email"
                          class="form-control"
                          type="text"
                          autocomplete="email"
                          v-model="email"
                          :rules="
                            'required|email:' +
                            $t('admins.email') +
                            ',abc@gmail.com'
                          "
                          ref="firstFocus"
                        />
                        <ErrorMessage name="login.email"/>
                      </CCol>
                    </CRow>
                    <CRow class="mt-2">
                      <CCol :xs="12" :md="6">
                        <CButton
                          size="lg"
                          color="primary"
                          class="btn-action btn-login px-4 btn"
                          type="submit"
                        >
                          {{ $t('auth.send_mail') }}
                        </CButton>
                      </CCol>
                      <CCol :xs="12" :md="6" class="text-right forgot_password pt-2">
                        <CLink href="/admin/login">
                          {{ $t('auth.back_to_login') }}
                        </CLink>
                      </CCol>
                    </CRow>
                  </div>
                  <div v-else class="text-center">
                    <p>{{ $t('auth.request_mail_sent') }}</p>
                    <CLink href="/admin/login">
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

import Loading from 'vue3-loading-overlay'

export default {
  name: 'RequestPassword',
  components: {
    Loading,
  },
  data: () => ({
    email: '',
    mailSent: false,
    fetching: false,
    loaded: false,
  }),
  mounted() {
    const firstFocus = this.$refs.firstFocus
    if (firstFocus?.focus) {
      firstFocus?.focus()
    } else {
      firstFocus?.$el.focus()
    }
  },
  methods: {
    async handleSendMail() {
      this.fetching = true
      this.$repositories.auth
        .requestPassword({email: this.email})
        .then(() => {
          this.mailSent = true
        })
        .catch((response) => {
          this.$toast.error(response.message)
          this.mailSent = false
        }).finally(() => {
        this.fetching = false
        this.loaded = true
      })
    },
  },
}
</script>

<style lang="scss">
.card-body {
  min-height: initial;
}
</style>

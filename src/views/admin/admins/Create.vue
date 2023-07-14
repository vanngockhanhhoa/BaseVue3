<template>
  <div>
    <MainLayout>
      <CCardHeader>
        <strong v-if="!isEditScreen()">{{
          $t('admins.title_create')
        }}</strong>
        <strong v-else>{{ $t('admins.title_update') }}</strong>
      </CCardHeader>
      <CCardBody>
        <form class="padding-form">
          <vee-form @submit="handleSubmit">
            <div class="w-60 w-md-100 form-wrapper">
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('admins.name') }}<span class="required">*</span>
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <vee-field
                    id="name"
                    name="name"
                    class="form-control"
                    type="text"
                    maxlength="255"
                    v-model="entry.name"
                    rules="required"
                    label="admins.name"
                  />
                  <ErrorMessage name="name" />
                </CCol>
              </CRow>
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('admins.email') }}<span class="required">*</span>
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <vee-field
                    id="email"
                    name="email"
                    class="form-control"
                    type="text"
                    maxlength="255"
                    v-model="entry.email"
                    :rules="
                      'required|email:' +
                      $t('admins.email') +
                      ',abc@gmail.com'
                    "
                    label="admins.email"
                    :disabled="isEditScreen()"
                  />
                  <ErrorMessage name="email" />
                </CCol>
              </CRow>
              <CRow class="mb-3">
                <CCol :lg="3" :xs="configs.grids.xs">
                  <label class="form_label col-form-label">
                    {{ $t('admins.status') }}<span class="required">*</span>
                  </label>
                </CCol>
                <CCol :lg="9" :xs="configs.grids.xs">
                  <div class="d-flex mt-1">
                    <div>
                      <input
                        name="status"
                        class="form-check-input mr-10"
                        id="valid"
                        type="radio"
                        :value="ACCOUNT_STATUS.VALID"
                        v-model="entry.status"
                      />
                    </div>
                    <label :class="isEditScreen ? 'form-check-label ' : 'form_label cursor_auto'" for="valid">{{
                        $t('fields.valid')
                      }}</label>
                    <div class="ml-50">
                      <input
                        name="status"
                        class="form-check-input mr-10"
                        id="invalid"
                        type="radio"
                        :value="ACCOUNT_STATUS.INVALID"
                        v-model="entry.status"
                      />
                    </div>
                    <label :class="isEditScreen ? 'form-check-label ' : 'form_label cursor_auto'" for="inValid">{{
                        $t('fields.in_valid')
                      }}</label>
                  </div>
                </CCol>
              </CRow>
              <CRow class="mb-3">
                <CCol
                  :lg="configs.grids.xs"
                  :xs="configs.grids.xs"
                  class="mt-5 text-center"
                >
                  <CButton
                    type="button"
                    color="secondary"
                    class="btn btn-cancel m-2"
                    @click="backToList()"
                  >
                    {{ $t('buttons.cancel') }}
                  </CButton>
                  <CButton
                    type="submit"
                    color="primary"
                    class="btn btn-action"
                  >
                    {{
                      !isEditScreen ? $t('buttons.save') : $t('buttons.save')
                    }}
                  </CButton>
                </CCol>
              </CRow>
            </div>
          </vee-form>
        </form>
      </CCardBody>
    </MainLayout>

    <confirm-navigation
      :visible="visibleCancelModal"
      @onClose="visibleCancelModal = false"
      @leftRoute="leftRoute"
    />
  </div>
</template>

<script>
import {
  ACCOUNT_STATUS,
  COLUMN_CONFIG,
  USER_INFO_KEY,
} from '@/config/consts'
import ConfirmNavigation from '@/components/Common/Modal/ConfirmNavigation.vue'
import CommonCreate from '@/views/common/Create.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { mapActions } from 'pinia'
import { useCommonsStore } from '@/store/useCommonsStore'
export default {
  name: 'HotelCreate',
  extends: CommonCreate,
  components: {
    ConfirmNavigation,
    MainLayout,
  },
  data() {
    return {
      typeScreen: 'create',
      configs: COLUMN_CONFIG,
      ACCOUNT_STATUS: ACCOUNT_STATUS,
      entry: {
        id: '',
        name: '',
        email: '',
        status: ACCOUNT_STATUS.VALID,
      },
      repositoryName: 'account',
      routerListScreenName: 'ListAccount',
      displayButtonSendMail: false,
    }
  },

  beforeRouteLeave(to) {
    return this.checkDirty(to)
  },
  computed: {
    isNotSetPasswordAndValidMail() {
      return !this.entry.isset_password || !this.entry.status
    },
  },
  methods: {
    async initEdit() {
      this.typeScreen = 'edit'
      await this.$repositories[this.repositoryName]
        .get(this.$route.params.id)
        .then((res) => {
          const data = res.data.results
          data.status = data.status.toString()
          this.initData = { ...data }
          this.entry = { ...data }
          if (
            this.typeScreen === 'edit' &&
            this.isNotSetPasswordAndValidMail
          ) {
            this.displayButtonSendMail = true
          }
        })
        .catch(() => {
          this.dirtyCheck = false
          this.$router.push({
            name: 'Page404',
          })
        })
    },
    ...mapActions(useCommonsStore, ['setUserInfo']),
    handleUpdate(data) {
      this.$repositories[this.repositoryName]
        .update(data.id, data)
        .then((response) => {
          if (
            response.data.results.email == this.$auth.getUser().email &&
            this.$auth.getUser().role === 'admin'
          ) {
            localStorage.setItem(
              USER_INFO_KEY,
              JSON.stringify({
                ...this.$auth.getUser(),
                ...response.data.results,
              }),
            )
            this.setUserInfo({
              ...this.$auth.getUser(),
              ...response.data.results,
            })
          }
          this.$toast.success(response.data.message)
          this.dirtyCheck = false
          this.$router.push({ name: this.routerListScreenName })
        })
        .catch((response) => {
          this.$toast.error(response.message)
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>

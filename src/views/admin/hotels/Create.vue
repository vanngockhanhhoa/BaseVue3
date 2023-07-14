<template>
  <div>
    <MainLayout>
      <CCardHeader>
        <strong v-if="!isEditScreen()">{{
            $t('hotels.title_create')
          }}</strong>
        <strong v-else>{{ $t('admins.title_update') }}</strong>
      </CCardHeader>
      <CCardBody>
        <form class="padding-form">
          <vee-form @submit="handleSubmit">
            <div class="w-60 w-md-100 form-wrapper">
              <!--Field name-->
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('hotels.name') }}<span class="required">*</span>
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
                    :rules="'required'"
                    label="admins.name"
                  />
                  <ErrorMessage name="name" />
                </CCol>
              </CRow>
              <!--Field dotw id-->
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('hotels.dotw_id') }}<span class="required">*</span>
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <vee-field
                    id="dotw_id"
                    name="dotw_id"
                    class="form-control"
                    type="text"
                    maxlength="255"
                    v-model="entry.dotw_id"
                    :rules="'required'"
                    label="hotels.dotw_id"
                  />
                  <ErrorMessage name="dotw_id" />
                </CCol>
              </CRow>
              <!--Field dotw pw-->
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('hotels.dotw_pw') }}<span class="required">*</span>
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <vee-field
                    id="dotw_pw"
                    name="dotw_pw"
                    class="form-control"
                    type="text"
                    maxlength="255"
                    v-model="entry.dotw_pw"
                    :rules="'required'"
                    label="hotels.dotw_pw"
                  />
                  <ErrorMessage name="dotw_pw" />
                </CCol>
              </CRow>
              <!--Field tll id-->
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('hotels.tl_lincoln_id') }}
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <vee-field
                    id="tl_lincoln_id"
                    name="tl_lincoln_id"
                    class="form-control"
                    type="text"
                    maxlength="255"
                    v-model="entry.tll_id"
                    label="hotels.tl_lincoln_id"
                  />
                  <ErrorMessage name="tl_lincoln_id" />
                </CCol>
              </CRow>
              <!--Field tll pw-->
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('hotels.tl_lincoln_pw') }}
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <vee-field
                    id="tl_lincoln_pw"
                    name="tl_lincoln_pw"
                    class="form-control"
                    type="text"
                    maxlength="255"
                    v-model="entry.tll_pw"
                    label="hotels.tl_lincoln_pw"
                  />
                  <ErrorMessage name="tl_lincoln_pw" />
                </CCol>
              </CRow>
              <!--Field dotw hotel id-->
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('hotels.dotw_hotel_id') }}
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <vee-field
                    id="dotw_hotel_id"
                    name="dotw_hotel_id"
                    class="form-control"
                    type="text"
                    maxlength="255"
                    v-model="entry.dotw_hotel_id"
                    label="hotels.dotw_hotel_id"
                  />
                  <ErrorMessage name="dotw_hotel_id" />
                </CCol>
              </CRow>
              <!--Field dotw chain id-->
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('hotels.dotw_chain_id') }}
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <vee-field
                    id="dotw_chain_id"
                    name="dotw_chain_id"
                    class="form-control"
                    type="text"
                    maxlength="255"
                    v-model="entry.dotw_chain_id"
                    label="hotels.dotw_chain_id"
                  />
                  <ErrorMessage name="dotw_chain_id" />
                </CCol>
              </CRow>
              <!--Field start date-->
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('hotels.start_date') }}
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <DatePicker
                    v-model="entry.start_date"
                    locale="en"
                    :attributes="attributes"
                    class="flex-grow"
                    :model-config="modelConfig"
                    trim-weeks>
                    <template v-slot="{ togglePopover }">
                      <CInputGroup>
                        <vee-field
                          :id="`start_date`"
                          :name="`start_date`"
                          class="form-control"
                          type="text"
                          v-model="entry.start_date"
                          readonly
                          :disabled="true"
                        />
                        <CButton
                          type="button"
                          color="primary"
                          variant="outline"
                          id="button-addon2"
                          class="btn-datepicker"
                          @click="togglePopover()"
                        >
                          <CIcon icon="cilCalendar" />
                        </CButton>
                      </CInputGroup>
                    </template>
                  </DatePicker>
                  <ErrorMessage name="start_date" />
                </CCol>
              </CRow>
              <!--Field address-->
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('hotels.address') }}
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <vee-field
                    id="address"
                    name="address"
                    class="form-control"
                    type="text"
                    maxlength="255"
                    v-model="entry.address"
                    label="hotels.address"
                  />
                  <ErrorMessage name="address" />
                </CCol>
              </CRow>
              <!--Field postal code-->
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('hotels.postal_code') }}
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <vee-field
                    id="postal_code"
                    name="postal_code"
                    label="fields.postal_code"
                    class="form-control"
                    type="text"
                    maxlength="8"
                    v-model="entry.postal_code"
                    :rules="'postal_code:' + $t('hotels.postal_code') + ',000-0000'"
                    @keypress="$filters.inputPhoneNumber($event)"
                    v-cleave="{ delimiter: '-', blocks: [3, 4] }"
                  />
                  <ErrorMessage name="postal_code"/>
                </CCol>
              </CRow>
              <!--Field phone-->
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('hotels.phone') }}
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <vee-field
                    id="phone"
                    name="phone"
                    class="form-control"
                    type="text"
                    maxlength="10"
                    v-model="entry.tel"
                    label="hotels.phone"
                    @keypress="$filters.inputPhoneNumber($event)"
                  />
                  <ErrorMessage name="phone" />
                </CCol>
              </CRow>
              <!--Field fax-->
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('hotels.fax') }}
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <vee-field
                    id="fax"
                    name="fax"
                    class="form-control"
                    type="text"
                    maxlength="10"
                    v-model="entry.fax"
                    label="hotels.fax"
                  />
                  <ErrorMessage name="fax" />
                </CCol>
              </CRow>
              <!--Field contact name-->
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('hotels.contact_name') }}
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <vee-field
                    id="contact_name"
                    name="contact_name"
                    class="form-control"
                    type="text"
                    maxlength="255"
                    v-model="entry.contact_name"
                    label="hotels.contact_name"
                  />
                  <ErrorMessage name="contact_name" />
                </CCol>
              </CRow>
              <!--Field contact phone-->
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('hotels.contact_phone') }}
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <vee-field
                    id="contact_phone"
                    name="contact_phone"
                    class="form-control"
                    type="text"
                    maxlength="10"
                    v-model="entry.contact_tel"
                    label="hotels.contact_phone"
                    @keypress="$filters.inputPhoneNumber($event)"
                  />
                  <ErrorMessage name="contact_phone" />
                </CCol>
              </CRow>
              <!--Field contact email-->
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('hotels.contact_email') }}
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <vee-field
                    id="contact_email"
                    name="contact_email"
                    class="form-control"
                    type="text"
                    maxlength="255"
                    v-model="entry.contact_email"
                    :rules="'email:' + $t('hotels.contact_email') + ',abc@gmail.com'"
                    label="hotels.contact_email"
                  />
                  <ErrorMessage name="contact_email" />
                </CCol>
              </CRow>
              <!--Field alert email-->
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('hotels.alert_email') }}
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <vee-field
                    id="alert_email"
                    name="alert_email"
                    class="form-control"
                    type="text"
                    maxlength="255"
                    v-model="entry.alert_email"
                    :rules="'email:' + $t('hotels.alert_email') + ',abc@gmail.com'"
                    label="hotels.alert_email"
                  />
                  <ErrorMessage name="alert_email" />
                </CCol>
              </CRow>
              <!--Field tool login email-->
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('hotels.tool_login_email') }}
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <vee-field
                    id="tool_login_email"
                    name="tool_login_email"
                    class="form-control"
                    type="text"
                    maxlength="255"
                    v-model="entry.tool_login_email"
                    :rules="'email:' + $t('hotels.tool_login_email') + ',abc@gmail.com'"
                    label="hotels.tool_login_email"
                  />
                  <ErrorMessage name="tool_login_email" />
                </CCol>
              </CRow>
              <!--Field tool login pw-->
              <CRow class="mb-3">
                <CCol :lg="configs.grids.label" :xs="configs.grids.xs">
                  <label class="form-label">
                    {{ $t('hotels.tool_login_pw') }}
                  </label>
                </CCol>
                <CCol :lg="configs.grids.input" :xs="configs.grids.xs">
                  <vee-field
                    id="tool_login_pw"
                    name="tool_login_pw"
                    class="form-control"
                    type="text"
                    maxlength="255"
                    v-model="entry.tool_login_pw"
                    :rules="'half_width_code:' + $t('hotels.tool_login_pw')"
                    label="hotels.tool_login_pw"
                  />
                  <ErrorMessage name="tool_login_pw" />
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
                    {{ !isEditScreen() ? $t('buttons.save') : $t('buttons.save') }}
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
  COLUMN_CONFIG, DATE_FORMAT,
} from '@/config/consts'
import ConfirmNavigation from '@/components/Common/Modal/ConfirmNavigation.vue'
import CommonCreate from '@/views/common/Create.vue'
import MainLayout from '@/layouts/MainLayout.vue'
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
      entry: {
        id: '',
        name: '',
        dotw_id: '',
        dotw_pw: '',
        tll_id: null,
        tll_pw: null,
        dotw_hotel_id: null,
        dotw_chain_id: null,
        start_date: null,
        address: null,
        postal_code: null,
        tel: null,
        fax: null,
        contact_name: null,
        contact_email: null,
        contact_tel: null,
        alert_email: null,
        tool_login_email: null,
        tool_login_pw: null,
      },
      repositoryName: 'hotel',
      routerListScreenName: 'HotelList',
      displayButtonSendMail: false,
      modelConfig: {
        type: 'string',
        mask: DATE_FORMAT,
      },
      attributes: [
        {
          dot: true,
          dates: [new Date()],
        },
      ],
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
      await this.$repositories[this.repositoryName]
        .get(this.$route.params.id)
        .then((res) => {
          const data = res.data.results
          this.initData = { ...data }
          this.entry = { ...data }
        })
        .catch((response) => {
          this.$toast.error(response.message)
          this.dirtyCheck = false
          this.$router.push({
            name: 'Page404',
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>

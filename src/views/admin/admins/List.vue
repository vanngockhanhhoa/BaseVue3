<template>
  <MainLayout>
        <CCardHeader>
          <strong>{{ $t('admins.title_list') }}</strong>
        </CCardHeader>
        <CCardBody>
          <div class="wrapper_search mb-4">
            <CRow class="search_fields">
              <CCol :lg="configs.grids.lg" :xs="configs.grids.xs" class="mb-2">
                <CFormInput
                  placeholder="Enter account name or email"
                  type="text"
                  :label="$t('admins.search')"
                  v-model="condition_search.search"
                />
              </CCol>
            </CRow>
            <div class="divider"></div>
            <CRow class="mt-3">
              <CCol class="text-center">
                <CButton
                  type="button"
                  color="secondary"
                  class="me-3 btn-action btn-reset"
                  @click="handleResetSearch()"
                  >{{ $t('buttons.reset') }}
                </CButton>
                <CButton
                  class="btn-action mr-0"
                  type="button"
                  color="primary"
                  @click="handleSearch()"
                  >{{ $t('buttons.search') }}
                </CButton>
              </CCol>
            </CRow>
          </div>
          <CRow class="mb-4">
            <CCol class="text-end">
              <router-link
                :to="{
                  name: 'CreateAccount',
                }"
              >
                <CButton color="primary" class="btn-action"
                  >{{ $t('buttons.create') }}
                </CButton>
              </router-link>
            </CCol>
          </CRow>
          <CCol :xs="12">
            <data-table ref="dataTable" :get-data="getList">
              <CTableHeaderCell scope="col" style="width: 3%">
                {{ $t('common.account_view.account_id') }}
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style="width: 5%" >
                {{ $t('common.account_view.account_name') }}
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style="width: 15%" >
                {{ $t('common.account_view.account_email') }}
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style="width: 5%" >
                {{ $t('common.account_view.account_status') }}
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style="width: 5%">
                {{ $t('common.account_view.edit') }}
              </CTableHeaderCell>
<!--              <CTableHeaderCell scope="col" style="width: 5%"-->
<!--                >{{ $t('common.account_view.Resend_Login_Url') }}-->
<!--              </CTableHeaderCell>-->
              <template v-slot:body="props">
                <CTableRow>
                  <CTableDataCell class="text-center">
                    {{ props.item.id }}
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    {{ props.item.name }}
                  </CTableDataCell>
                  <CTableDataCell>
                    {{ props.item.email }}
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    {{ props.item.status == ACCOUNT_STATUS.VALID ? $t('fields.valid') : $t('fields.in_valid') }}
                  </CTableDataCell>
                  <CTableDataCell class="text-center my-3 action-col">
                    <div class="d-inline-flex">
                      <router-link
                        :to="{
                          name: 'UpdateAccount',
                          params: { id: props.item.id },
                        }"
                        v-on="on"
                        class="mr-10"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-pen"
                          class="me-3 icon-font-size"
                        />
                      </router-link>
                    </div>
                  </CTableDataCell>
<!--                  <CTableDataCell class="text-center my-3 action-col">-->
<!--                    <div class="d-inline-flex">-->
<!--                      <CButton-->
<!--                        class="btn-action mr-0"-->
<!--                        type="button"-->
<!--                        color="primary"-->
<!--                        @click="handleSendMail(props.item.email)"-->
<!--                      >{{ $t('buttons.send_email') }}-->
<!--                      </CButton>-->
<!--                    </div>-->
<!--                  </CTableDataCell>-->
                </CTableRow>
              </template>
            </data-table>
          </CCol>
        </CCardBody>
  </MainLayout>
  <confirm-delete-modal
    :visible="visibleDeleteModal"
    @onClose="visibleDeleteModal = false"
    @handleDelete="handleDelete(selectedItem)"
  >
    {{ $t('popup.text_delete', [$t('admins.name'), selectedItem.name]) }}
  </confirm-delete-modal>
</template>

<script>
import {ACCOUNT_STATUS, DEFAULT_PAGE, STATUS} from '@/config/consts'
import { getItemLabelInArray } from '@/utils/functions'
import CommonList from "@/views/common/CommonList.vue";
import MainLayout from '@/layouts/MainLayout.vue'

export default {
  name: 'AccountSetting',
  extends: CommonList,
  components: {
    MainLayout,
  },
  data() {
    return {
      configs: {
        grids: {
          lg: 3,
          xs: 12,
        },
      },
      condition_search: this.initialSearch(),
      visibleDeleteModal: false,
      selectedItem: 0,
      ACCOUNT_STATUS: ACCOUNT_STATUS,
      STATUS: STATUS,
      getItemLabelInArray,
      repositoryName: 'account',
      offset: 0,
      lastPerPage: DEFAULT_PAGE,
      sort: {},
      currentConditionSearch: null,
      submitSearch: false,
    }
  },

  props: {
    roleId: {
      type: String,
      required: false,
    },
  },
  mounted() {
  },
  methods: {
    initialSearch() {
      return {
        search: '',
        componentName: 'AccountSetting',
      }
    },

    async handleSendMail(email) {
      this.$repositories.auth
        .requestPassword({email: email})
        .then((response) => {
          this.$toast.success(response.data.message)
          this.mailSent = true
        })
        .catch((response) => {
          this.$toast.error(response.message)
          this.mailSent = false
        }).finally(() => {
        this.loaded = true
      })
    },
  },
}
</script>

<template>
  <MainLayout>
        <CCardHeader>
          <strong>{{ $t('hotels.title_list') }}</strong>
        </CCardHeader>
        <CCardBody>
          <div class="wrapper_search mb-4">
            <CRow class="search_fields">
              <CCol :lg="configs.grids.lg" :xs="configs.grids.xs" class="mb-2">
                <CFormInput
                  type="text"
                  :label="$t('hotels.hotel_name')"
                  v-model="condition_search.name"
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
                  name: 'HotelCreate',
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
                {{ $t('common.label_column_no') }}
            </CTableHeaderCell>
              <CTableHeaderCell scope="col" style="width: 10%" >
                {{ $t('hotels.name') }}
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style="width: 6%" >
                {{ $t('hotels.plan') }}
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style="width: 6%" >
                {{ $t('hotels.rate') }}
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style="width: 7%">
                {{ $t('hotels.start_date') }}
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style="width: 15%" >
                {{ $t('hotels.address') }}
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style="width: 7%" >
                {{ $t('hotels.phone') }}
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style="width: 5%" >
                {{ $t('hotels.dotw_id') }}
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style="width: 5%" >
                {{ $t('hotels.tl_lincoln_id') }}
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style="width: 5%" >
                {{ $t('hotels.dotw_hotel_id') }}
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style="width: 5%" >
                {{ $t('hotels.dotw_chain_id') }}
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style="width: 2%" >
                {{ $t('common.action') }}
              </CTableHeaderCell>
              <template v-slot:body="props">
                <CTableRow>
                  <CTableDataCell class="text-center">
                    {{ props.item.id }}
                  </CTableDataCell>
                  <CTableDataCell>
                    <router-link
                      :to="{
                        name: 'HotelUpdate',
                        params: { id: props.item.id },
                      }"
                      v-on="on"
                      class="mr-10"
                    >
                    <span class="text-green-500">
                      {{ props.item.name }}
                    </span>
                    </router-link>
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    <div class="d-inline-flex">
                      <router-link
                        :to="{
                          name: 'HotelList',
                          params: { id: props.item.id },
                        }"
                        v-on="on"
                        class="mr-10"
                      >
                      <span class="text-green-500">
                        {{ $t('buttons.plan_info') }}
                      </span>
                      </router-link>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    <div class="d-inline-flex">
                      <router-link
                        :to="{
                          name: 'HotelList',
                          params: { id: props.item.id },
                        }"
                        v-on="on"
                        class="mr-10"
                      >
                      <span class="text-green-500">
                        {{ $t('buttons.rate_info') }}
                      </span>
                      </router-link>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    {{ formatDate(props.item.start_date, DATE_FORMAT) }}
                  </CTableDataCell>
                  <CTableDataCell>
                    {{ props.item.address }}
                  </CTableDataCell>
                  <CTableDataCell>
                    {{ props.item.tel }}
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    {{ props.item.dotw_id }}
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    {{ props.item.tll_id }}
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    {{ props.item.dotw_hotel_id }}
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    {{ props.item.dotw_chain_id }}
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    <div class="d-inline-flex">
                      <a href="javascript:void(0);" v-on="on">
                        <font-awesome-icon
                          icon="fa-solid fa-trash"
                          @click="
                            () => {
                              selectedItem = props.item
                              visibleDeleteModal = true
                            }
                          "
                          color="red"
                          class="icon-font-size"
                        />
                      </a>
                    </div>
                  </CTableDataCell>
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
    {{ $t('modals.popup.text_delete', [$t('admins.name'), selectedItem.name]) }}
  </confirm-delete-modal>
</template>

<script>
import { getItemLabelInArray, formatDate } from '@/utils/functions'
import CommonList from "@/views/common/CommonList.vue"
import MainLayout from '@/layouts/MainLayout.vue'
import { DATE_FORMAT } from '@/config/consts'
export default {
  name: 'Admins',
  computed: {
  },
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
      getItemLabelInArray,
      offset: 0,
      lastPerPage: 50,
      sort: {},
      currentConditionSearch: null,
      submitSearch: false,
      formatDate,
      DATE_FORMAT,
      repositoryName: 'hotel',
    }
  },

  props: {
    roleId: {
      type: String,
      required: false,
    },
  },
  methods: {
    initialSearch() {
      return {
        name: '',
        componentName: 'Hotel',
      }
    },
  },
}
</script>

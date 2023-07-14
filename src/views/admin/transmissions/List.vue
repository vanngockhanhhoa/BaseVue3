<template>
  <MainLayout>
    <CCardHeader>
      <strong>{{ $t('transmission.title_list') }}</strong>
    </CCardHeader>
    <CCardBody>
      <div class="wrapper_search mb-4">
        <CRow class="search_fields">
          <CCol class="mb-2 col-custom col-input">
            <CFormLabel for="contract_period">
              {{ $t('transmission.period') }}
            </CFormLabel>
            <CRow>
              <CCol class="date-field date-input-left">
                <DatePicker
                  v-model="condition_search.start_date"
                  locale="en"
                  :attributes="attributes"
                  class="flex-grow"
                  :model-config="modelConfig"
                  trim-weeks
                  :max-date="condition_search.end_date ? condition_search.end_date : undefined"
                >
                  <template v-slot="{ togglePopover }">
                    <CInputGroup>
                      <vee-field
                        :id="`start_date`"
                        :name="`start_date`"
                        class="form-control"
                        type="text"
                        v-model="condition_search.start_date"
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
              </CCol>
              <CCol
                class="search-range-separator range-separator-responsive"
                style
                >~</CCol
              >
              <CCol class="date-field date-input-right">
                <DatePicker
                  v-model="condition_search.end_date"
                  locale="en"
                  :attributes="attributes"
                  class="flex-grow"
                  :model-config="modelConfig"
                  trim-weeks
                  :min-date="condition_search.start_date ? condition_search.start_date : undefined"
                >
                  <template v-slot="{ togglePopover }">
                    <CInputGroup>
                      <vee-field
                        :id="`end_date`"
                        :name="`end_date`"
                        class="form-control"
                        type="text"
                        v-model="condition_search.end_date"
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
              </CCol>
            </CRow>
          </CCol>
          <CCol class="mb-2 col-custom col-input">
            <CFormLabel for="process">
              {{ $t('transmission.process') }}
            </CFormLabel>
            <CFormSelect
              name="process"
              aria-describedby="Process"
              v-model="condition_search.process"
              :options="PROCESS_OPTIONS"
            />
          </CCol>
          <CCol class="mb-2 col-custom col-input">
            <CFormLabel for="hotel">
              {{ $t('transmission.hotel') }}
            </CFormLabel>
            <CFormSelect
              name="hotel"
              aria-describedby="Hotel"
              v-model="condition_search.hotel"
              :options="hotels"
            />
          </CCol>
          <CCol class="mb-2 col-custom col-input">
            <CFormLabel for="endpoint">
              {{ $t('transmission.endpoint') }}
            </CFormLabel>
            <CFormSelect
              name="process"
              aria-describedby="Endpoint"
              v-model="condition_search.endpoint"
              :options="ENDPOINT_OPTIONS"
            />
          </CCol>
          <CCol class="mb-2 col-custom col-input-checkbox">
            <label class="form-label mr-50">
              {{ $t('transmission.status') }}
            </label>
            <div class="d-flex mt-2">
              <label
                v-for="status in STATUS_OPTIONS"
                :key="status.value"
                :id="status.value"
              >
                <input
                  class="form-check-input mr-10"
                  type="checkbox"
                  :value="status.value"
                  v-model="condition_search.status"
                />
                <span class="mr-10 radio-disable">{{ status.label }}</span>
              </label>
            </div>
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
      <CCol :xs="12">
        <data-table ref="dataTable" :get-data="getList">
          <CTableHeaderCell scope="col" style="width: 17.5%">
            {{ $t('transmission.hotel') }}
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" style="width: 17.5%">
            {{ $t('transmission.process') }}
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" style="width: 7.5%">
            {{ $t('transmission.endpoint') }}
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" style="width: 7.5%">
            {{ $t('transmission.method') }}
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" style="width: 7.5%">
            {{ $t('transmission.status') }}
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" style="width: 17.5%">
            {{ $t('transmission.result') }}
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" style="width: 12.5%">
            {{ $t('transmission.start_time') }}
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" style="width: 12.5%">
            {{ $t('transmission.end_time') }}
          </CTableHeaderCell>
          <template v-slot:body="props">
            <CTableRow>
              <CTableDataCell class="text-left">{{
                props.item?.hotel?.name
              }}</CTableDataCell>
              <CTableDataCell class="text-left">{{
                getItemLabelInArray(props.item?.process, PROCESS_OPTIONS)
              }}</CTableDataCell>
              <CTableDataCell class="text-left">{{
                getItemLabelInArray(props.item?.endpoint, ENDPOINT_OPTIONS)
              }}</CTableDataCell>
              <CTableDataCell class="text-left">{{
                getItemLabelInArray(props.item?.method, METHOD_OPTIONS)
              }}</CTableDataCell>
              <CTableDataCell class="text-left">{{
                getItemLabelInArray(props.item?.status, STATUS_OPTIONS)
              }}</CTableDataCell>
              <CTableDataCell class="text-left">{{
                props.item.result
              }}</CTableDataCell>
              <CTableDataCell class="text-left">{{
                props.item.start_time
              }}</CTableDataCell>
              <CTableDataCell class="text-left">{{
                props.item.end_time
              }}</CTableDataCell>
            </CTableRow>
          </template>
        </data-table>
      </CCol>
    </CCardBody>
  </MainLayout>
</template>

<script>
import { getItemLabelInArray } from '@/utils/functions'
import CommonList from '@/views/common/List.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import {
  COLUMN_CONFIG,
  DATE_FORMAT,
  PROCESS_OPTIONS,
  ENDPOINT_OPTIONS,
  STATUS_OPTIONS,
  METHOD_OPTIONS,
} from '@/config/consts'

export default {
  name: 'Admins',
  extends: CommonList,
  components: {
    MainLayout,
  },

  data() {
    return {
      configs: COLUMN_CONFIG,
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
      repositoryName: 'transmission',
      condition_search: this.initialSearch(),
      getItemLabelInArray,
      offset: 0,
      sort: {},
      submitSearch: false,
      PROCESS_OPTIONS,
      ENDPOINT_OPTIONS,
      STATUS_OPTIONS,
      METHOD_OPTIONS,
      // wait for hotel API get
      hotels: [
        {
          label: '',
          value: '',
        },
        {
          label: 'Hotel1',
          value: 113,
        },
        {
          label: 'Hotel2',
          value: 789,
        },
        {
          label: 'Hotel3',
          value: 345,
        },
      ],
    }
  },

  mounted() {
    document.getElementById('start_date').focus()
  },

  methods: {
    initialSearch() {
      return {
        start_date: '',
        end_date: '',
        hotel: '',
        process: '',
        status: [],
        endpoint: '',
      }
    },
  },
}
</script>

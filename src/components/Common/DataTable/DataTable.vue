<template>
  <div class="wapper_datatable">
    <div class="pagination_info mb-2" v-if="totalRecord > 0 && !hideHeader">
      <span class="record-info">
        <span class="text-paging-info">Showing </span>
        <b>{{ from || 0 }} </b>
        <span class="text-paging-info"> to </span>
        <b> {{ to || 0 }} </b>
        <span class="text-paging-info"> of </span>
        <b> {{ $filters.toCurrency(totalRecord) }} </b>
        <span class="text-paging-info"> total</span>
      </span>
      <div class="d-flex pagination_scroll">
        <div class="d-flex">
          <span class="me-2 perpage-label pagination_number">{{ $t('common.label_perpage') }}</span>
          <CFormSelect
            :options="perpageOptions"
            v-model="params.per_page"
            @change="setPerPage($event.target.value)"
            class="perpage"
          />
        </div>
        <template v-if="lastPage >= 1">
          <pagination
            ref="pagination"
            class="text-center ms-3"
            :per-page="params.per_page"
            :records="totalRecord"
            :currentPage="params.page"
            @pagination:page="onPageChange"
          />
        </template>
      </div>
    </div>
    <div class="datatableContainer">
      <div
        class="datatableWrapper"
        :style="{ width: widthTable, 'max-height': maxHeight}"
      >
        <CTable hover bordered>
          <CTableHead>
            <CTableRow @click="onSort" class="text-center">
              <slot />
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-if="isNoData" class="noData">
              <CTableDataCell colspan="100%">
                <span class="label-no-data">{{
                  labelNoData ? labelNoData : $t('common.no_data')
                }}</span>
              </CTableDataCell>
            </CTableRow>
            <slot name="first_row" />
            <slot
              v-for="(row, index) in rows"
              name="body"
              :item="row"
              :index="index"
            />
            <template>
              <div v-for="(row, key) in emptyRow" :key="key">
                <CTableRow>
                  <div v-for="(col, k) in column" :key="k">
                    <CTableDataCell />
                  </div>
                </CTableRow>
              </div>
            </template>
            <slot name="end_row" />
          </CTableBody>
        </CTable>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination'
import _ from 'lodash'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import {DEFAULT_PAGE, PAGINATION_OPTIONS} from '@/config/consts'

export default {
  components: {
    Pagination,
  },
  props: {
    getData: {
      required: true,
      type: Function,
    },
    limit: {
      type: Number,
      default: DEFAULT_PAGE,
    },
    chunk: {
      type: Number,
      default: DEFAULT_PAGE,
    },
    widthTable: {
      type: String,
      default: '100%',
    },
    maxHeight: {
      type: String,
      default: '27.5rem',
    },
    labelNoData: {
      type: String,
      default: '',
    },
    loadOnCreate: {
      type: Boolean,
      default: true,
    },
    componentName: {
      type: String,
      default: '',
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    validBeforeSort: {
      type: Boolean,
      default: false,
    },
    isFullPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      maxPageWidth: DEFAULT_PAGE,
      totalRecord: 0,
      lastPage: 0,
      page: 1,
      perPage: this.limit,
      column: 0,
      from: 0,
      to: 0,
      rows: [],
      params: {
        per_page: this.limit,
        page: 1,
        submitSearch: false
      },
      orderBy: null,
      sortedBy: null,
      isNoData: false,
      extraLoading: false,
      perpageOptions: PAGINATION_OPTIONS,
    }
  },
  computed: {
    emptyRow() {
      return 0
    },
  },
  watch: {
    // perPage: function () {
    //   this.page = 1
    //   this.fetch()
    // },
  },
  created() {
    if (this.loadOnCreate) {
      this.fetch()
    }
    this.$emit('DataTable:filter', (params) => {
      this.filter(params)
    })
  },
  mounted() {
    this.column = _.chain(this.$slots.default)
      .filter((el) => {
        return el.tag === 'th'
      })
      .value().length
  },
  methods: {
    onPageChange(page) {
      this.page = page
      this.params.page = page
      if(this.params?.submitSearch === false){
        this.params.submitSearch = true
      }
      this.fetch()
    },

    getTarget(target) {
      let node = target
      while (node.parentNode.nodeName !== 'TR') {
        node = node.parentNode
      }
      return node
    },

    getSortOrder(target) {
      let sortOrder = target.dataset.sortOrder
      switch (sortOrder) {
        case 'asc':
          sortOrder = 'desc'
          break
        case 'desc':
          sortOrder = ''
          break
        case '':
          sortOrder = 'asc'
          break
        default:
          sortOrder = 'asc'
      }
      return sortOrder
    },

    setSortOrders(target, sortOrder) {
      let iterator = target.parentNode
      while (iterator) {
        iterator.dataset.sortOrder = ''
        iterator = iterator.nextElementSibling
      }
      target.dataset.sortOrder = sortOrder
    },

    onSort(event) {
      if (this.validBeforeSort) {
        return
      }
      const target = this.getTarget(event.target)
      const orderBy = target.dataset.sortField
      if (!orderBy) {
        return
      }
      this.sortedBy = this.getSortOrder(target)
      this.orderBy = this.sortedBy ? orderBy : ''

      Object.assign(this.params, {
        sort: {
          [this.orderBy]: this.sortedBy,
        },
      })
      this.setSortOrders(target, this.sortedBy)
      this.fetch()
    },

    async fetch() {
      const res = await this.getData(this.params).catch(
        () => {
          this.isNoData = true
          this.$emit('DataTable:finish')
          return []
        },
      )
      const data = res?.results
      if (!data) {
        this.isNoData = true
        this.$emit('DataTable:finish')
        return
      }
      this.column = _.chain(this.$slots.default)
        .filter((el) => {
          return el.tag === 'th'
        })
        .value().length
      this.isNoData = false
      if (data.data.length === 0) {
        this.isNoData = true
      }
      if (!data.data) {
        this.rows = data
        this.$emit('DataTable:finish')
        return
      }

      this.params.page = parseInt(data.current_page)
      this.params.per_page = parseInt(data.per_page)
      this.totalRecord = parseInt(data.total)
      this.lastPage = parseInt(data.last_page)
      this.from = parseInt(data.from)
      this.to = parseInt(data.to)
      this.rows = data.data
      this.$emit('DataTable:finish')
    },

    refresh() {
      this.fetch()
    },

    filter(params) {
      this.params.page = 1
      this.params.sort = {}
      if(!this.params.per_page){
        this.params.per_page = DEFAULT_PAGE
      }
      if(params){
        this.params = params
      }
      this.fetch()
    },

    resetAll() {
      this.params.page = 1
      this.params.per_page = DEFAULT_PAGE
      this.params.sort = {}
      this.fetch()
    },

    clear() {
      this.rows = []
      this.isNoData = true
    },

    resetPagePagination() {
      this.page = 1
      this.params.page = 1
      if (this.lastPage > 1) {
        this.$refs.pagination.page = 1
      }
    },

    setPerPage(perPage) {
      if(this.params?.submitSearch === false){
        this.params.submitSearch = true
      }
      this.params.per_page = perPage
      this.params.page = 1
      this.fetch()
    },

    onLoading() {
      this.extraLoading = true
    },

    offLoading() {
      this.extraLoading = false
    },
    prependRow() {
      this.rows.unshift({})
    },

    resetSort() {
      this.params.sort = {}
    },

    removeRow() {
      this.rows.shift({})
    },

    setParams(params) {
      this.params = params
      this.page = params.page
      this.per_page = params.per_page
    },

  },
}
</script>

<style lang="scss" scoped>
th {
  cursor: pointer;
}
th[data-sort-field] span::after {
  font-family: 'Material Icons';
  content: 'unfold_more';
  vertical-align: middle;
  font-size: 15px;
}

th[data-sort-order='desc'] span::after {
  content: 'expand_less';
}

th[data-sort-order='asc'] span::after {
  content: 'expand_more';
}

thead {
  tr {
    position: sticky;
    top: -1px;
    border: 1px solid #d8dbe0;
  }
}

.datatableContainer {
  max-width: 100%;
  overflow-x: auto;
  // height: 27rem;

  .datatableWrapper {
    th,
    td {
      vertical-align: middle;
    }
    .noData {
      padding-top: 20px;
    }
  }
}

.pagination_info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
// responsive
@media screen and (max-width: 768px) {
  .wapper_datatable {
    overflow-x: scroll;
    overflow-y: hidden;
  }
}

@media(max-width: 567px) {
  .pagination_scroll {
    overflow-x: scroll;
    overflow-y: hidden;
  }
}

.pagination_number {
  white-space: pre;
}
</style>

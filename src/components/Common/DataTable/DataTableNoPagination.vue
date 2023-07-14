<template>
  <div class="wapper_datatable">
    <loading
      :active="fetching || extraLoading"
      :is-full-page="false"
    ></loading>

    <div class="datatableContainer">
      <div class="datatableWrapper" :style="{ width: widthTable }">
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
import _ from 'lodash'
import Loading from 'vue3-loading-overlay'
// Import stylesheet
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

export default {
  components: {
    Loading
  },
  props: {
    getData: {
      required: true,
      type: Function,
    },
    limit: {
      type: Number,
      default: 200,
    },
    chunk: {
      type: Number,
      default: 10,
    },
    widthTable: {
      type: String,
      default: '100%',
    },
    maxHeight: {
      type: String,
      default: "26.5rem",
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
    }
  },
  data() {
    return {
      maxPageWidth: 10,
      totalRecord: 0,
      lastPage: 0,
      page: 1,
      perPage: this.limit,
      column: 0,
      from: 0,
      to: 0,
      fetching: false,
      rows: [],
      params: {},
      orderBy: null,
      sortedBy: null,
      isNoData: false,
      extraLoading: false,
    }
  },
  computed: {
    emptyRow() {
      return 0
    },
  },
  watch: {
    perPage: function () {
      this.page = 1
      this.fetch()
    },
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
      const meta = {
        page: this.page,
        per_page: this.perPage,
      }
      this.fetching = true
      const res = await this.getData(Object.assign(meta, this.params))
        .catch(() => {
          this.isNoData = true
          this.fetching = false
          this.$emit('DataTable:finish')
          return []
        })
      const data = res?.results
      if (!data) {
        this.isNoData = true
        this.fetching = false
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

      const pagination = data.pagination
      if (pagination) {
        this.page = parseInt(pagination.current_page)
        this.totalRecord = parseInt(pagination.total_records)
        this.lastPage = parseInt(pagination.total_pages)
        this.perPage = parseInt(pagination.per_page)
        this.from = parseInt(pagination.from)
        this.to = parseInt(pagination.to)
      } else {
        this.page = parseInt(data.current_page)
        this.totalRecord = parseInt(data.total)
        this.lastPage = parseInt(data.last_page)
        this.perPage = parseInt(data.per_page)
        this.from = parseInt(data.from)
        this.to = parseInt(data.to)
      }
      this.rows = data.data
      this.$emit('DataTable:finish')
      this.fetching = false
    },

    refresh() {
      this.page = 1
      this.resetPagePagination()
      this.fetch()
    },

    filter(params) {
      this.page = 1
      this.params = params
      this.fetch()
    },

    clear() {
      this.rows = []
      this.isNoData = true
    },

    resetPagePagination() {
      if (this.lastPage > 1) {
        this.$refs.pagination.page = 1
      }
    },

    setPerPage(perPage) {
      this.perPage = perPage
    },

    onLoading(){
      this.extraLoading = true
    },

    offLoading(){
      this.extraLoading = false
    }
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

  .datatableWrapper {
    th, td {
      vertical-align: middle;;
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
</style>


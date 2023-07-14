<script>
import {COLUMN_CONFIG, ACCOUNT_STATUS, DEFAULT_PAGE} from '@/config/consts'
import { cloneDeep } from 'lodash'

export default {
  name: 'CommonList',
  data() {
    return {
      configs: COLUMN_CONFIG,
      repositoryName: '',
      visibleDeleteModal: false,
      selectedItem: 0,
      indexColumnNo: 1,
      offset: 0,
      lastPerPage: DEFAULT_PAGE,
      permission: '',
      sort: {},
      searchParams: {},
      currentConditionSearch: {},
    }
  },

  methods: {
    /**
     * Get data list for the table field
     *
     * @param params
     * @returns {Promise<{results}>}
     */
    async getList(params) {
      this.sort = params.sort
      Object.keys(this.currentConditionSearch).map((field) => {
        if(typeof this.currentConditionSearch[field] === 'string' || typeof this.currentConditionSearch[field] === 'number'){
          this.currentConditionSearch[field] = this.currentConditionSearch[field].toString().trim()
        }
      })

      this.searchParams = Object.assign({}, params, {
        filter: cloneDeep(this.currentConditionSearch),
      })

      for (const [key, value] of Object.entries(this.searchParams.filter)){
        if(Array.isArray(value)){
          this.searchParams.filter[key] = value.toString()
        }
      }

      let res = await this.$repositories[this.repositoryName]
        .list(
          this.searchParams
        )
        .then((response) => {
          this.lastPerPage = response.data.results.per_page
          return response
        })
        .catch(() => {
          return []
        })
        .finally(() => {
          for (const key of Object.keys(this.condition_search)){
            if (Array.isArray(this.condition_search[key])) {
              this.condition_search[key] = this.currentConditionSearch[key] ? this.currentConditionSearch[key] : []
            } else {
              this.condition_search[key] = this.currentConditionSearch[key] ? this.currentConditionSearch[key] : ''
            }
          }
        })
      if (Array.isArray(res)) {
        this.offset = 0
        return Promise.resolve({
          results: {
            data: [],
            current_page: 1,
            total: 0,
            last_page: 0,
            per_page: this.lastPerPage,
            from: 0,
            to: 0,
          },
        })
      }
      this.offset = res.data.results.pagination
        ? (res.data.results.pagination.current_page - 1) *
          res.data.results.pagination.per_page
        : (res.data.results.current_page - 1) * res.data.results.per_page
      return Promise.resolve({
        results: res.data.results,
      })
    },
    refresh() {
      this.$refs.dataTable.refresh()
    },

    handleSearch() {
      this.$refs.dataTable.resetSort()
      this.$refs.dataTable.resetPagePagination()
      this.currentConditionSearch = cloneDeep(this.condition_search)
      this.refresh()
    },

    /**
     * Reset condition search to the default condition
     */
    handleResetSearch() {
      this.$data.condition_search = this.initialSearch()
      this.currentConditionSearch = {}
      this.$refs.dataTable.resetSort()
      this.$refs.dataTable.resetPagePagination()
      this.refresh()
    },

    /**
     * Delete the record in the table field
     *
     * @param item
     * @returns {Promise<void>}
     */
    async handleDelete(item) {
      if (
        this.checkActiveDelete &&
        item.is_active == ACCOUNT_STATUS.VALID
      ) {
        this.visibleDeleteModal = false
        return this.$toast.error(
          this.$t('messages.common.cannot_delete_data_active', [
            this.$t('common.active'),
          ]),
        )
      }
      await this.$repositories[this.repositoryName]
        .delete(item.id, { updated_at: item.updated_at })
        .then((response) => {
          this.$toast.success(response.data.message)
          this.refresh()
        })
        .catch((response) => {
          this.$toast.error(response.message)
        })
        .finally(() => {
          this.visibleDeleteModal = false
        })
    },


  },
}
</script>

<script>
import {COLUMN_CONFIG, ACCOUNT_STATUS, DEFAULT_PAGE} from '@/config/consts'
import { mapState, mapActions } from 'pinia'
import { removeCommas } from '@/utils/functions'
import { cloneDeep } from 'lodash'
import { useCommonsStore } from '@/store/useCommonsStore'

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
      currentConditionSearch: null,
      submitSearch: false,
    }
  },
  // created() {
  //   this.permission = this.$auth.getUser()?.is_master.toString()
  // },
  computed: {
    ...mapState(useCommonsStore, ['conditionSearch']),
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
      Object.keys(this.condition_search).map((field) => {
        if(typeof this.condition_search[field] === 'string' || typeof this.condition_search[field] === 'number'){
          this.condition_search[field] = this.condition_search[field].toString().trim()
        }
      })
      const searchParams = Object.assign({}, { params }, {
        filter: this.condition_search,
      })
      // remove comas in quantity field
      let searchParamsRequest = cloneDeep(searchParams)
      this.currentConditionSearch = this.removeCommas(cloneDeep(searchParamsRequest, true))
      const newCondition = this.handleKeepParamSearch()
      let res = await this.$repositories[this.repositoryName]
        .list(
          newCondition
        )
        .then((response) => {
          this.lastPerPage = response.data.results.per_page
          return response
        })
        .catch(() => {
          return []
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

    refresh() {
      this.$refs.dataTable.refresh()
    },

    filter() {
      this.submitSearch = true
      this.$refs?.dataTable.filter()
    },

    resetAll() {
      this.submitSearch = true
      this.$refs?.dataTable.resetAll()
    },

    handleSearch() {
      Object.keys(this.condition_search).map((field) => (
        this.condition_search[field] = (typeof this.condition_search[field] === 'string') ? this.condition_search[field].trim() : this.condition_search[field]
      ))
      this.filter()
    },

    /**
     * Reset condition search to the default condition
     */
    handleResetSearch() {
      this.$data.condition_search = this.initialSearch()
      this.resetAll()
    },

    // keep condition search when change page
    ...mapActions(useCommonsStore, ['setConditionSearch']),

    getConditionSearch(){
      if(!this.currentConditionSearch?.filter) return
      let componentName = this.currentConditionSearch.filter.componentName
      return this.conditionSearch[componentName]
    },

    commitConditionSearch(conditionSearch){
      return this.setConditionSearch(conditionSearch)
    },

    handleKeepParamSearch(submitSearch = false){
      if(this.submitSearch || this.currentConditionSearch.params.submitSearch || submitSearch){
        this.commitConditionSearch(
          Object.assign({},
            { extraData: this.extraData || {} },
            { searchs: this.currentConditionSearch }
          )
        )
        this.submitSearch = false
        this.currentConditionSearch.params.submitSearch = false
      }else{
        let storeConditionSearch = this.getConditionSearch()
        let storeSearchs = storeConditionSearch?.searchs
        if(storeConditionSearch) {
          this.currentConditionSearch = storeConditionSearch.searchs
        }
        if(storeConditionSearch?.extraData){
          this.extraData = storeConditionSearch.extraData
        }
        if(storeSearchs?.filter){
          this.condition_search = this.formatCurrency(cloneDeep(storeSearchs))
        }
        if(storeSearchs?.params){
          this.$nextTick(() => {
            this.$refs.dataTable.setParams(storeSearchs.params)
          })
        }
      }
      let newCondition = Object.assign({}, this.currentConditionSearch.params, {filter: this.currentConditionSearch.filter})
      return this.removeCommas(cloneDeep(newCondition))
    },

    removeCommas(searchParamsRequest) {
      for (const property in searchParamsRequest.filter) {
        const fieldMustBeNumbers = this.fieldMustBeNumbers ? this.fieldMustBeNumbers.concat(['quantity', 'price']) : ['quantity', 'price']
        if (fieldMustBeNumbers.includes(property) || property.includes("quantity") || property.includes("price")) {
          searchParamsRequest.filter[property] = removeCommas(searchParamsRequest.filter[property])
        }
      }
      return searchParamsRequest
    },

    formatCurrency(searchParamsRequest) {
      for (const property in searchParamsRequest.filter) {
        const fieldMustBeNumbers = this.fieldMustBeNumbers ? this.fieldMustBeNumbers.concat(['quantity', 'price']) : ['quantity', 'price']
        if (fieldMustBeNumbers.includes(property) || property.includes("quantity") || property.includes("price")) {
          searchParamsRequest.filter[property] = this.$filters.convertCurrency(searchParamsRequest.filter[property])
        }
      }
      return searchParamsRequest.filter
    },

  },
}
</script>

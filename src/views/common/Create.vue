<script>
import { ref } from 'vue'
import { isEqual } from 'lodash'
import { COLUMN_CONFIG } from '@/config/consts'
import { mapState } from 'pinia'
import { useCommonsStore } from '@/store/useCommonsStore'

export default {
  name: 'CommonCreate',
  data() {
    return {
      configs: COLUMN_CONFIG,
      entry: {},
      initData: {},
      dirtyCheck: false,
      routeToLeave: null,
      repositoryName: '',
      visibleCancelModal: false,
      routerListScreenName: '',
      typeScreen: 'create',
      permission: '',
      selectedItem: 0,
    }
  },
  setup() {
    const activeKey = ref(1)
    const flushActiveKey = ref(1)
    return {
      activeKey,
      flushActiveKey,
    }
  },
  created() {
    // this.permission = (this.$auth.getUser().is_master).toString()
    if (this.$route.params.id) {
      this.initEdit()
      this.dirtyCheck = false
    }
  },
  computed: {
    ...mapState(useCommonsStore, ['loading'])
  },
  watch: {
    entry: {
      handler(newValue) {
        this.dirtyCheck = !isEqual(this.initData, newValue)
      },
      deep: true,
    },
  },
  mounted() {
    const firstFocus = this.$refs.firstFocus
    if (firstFocus?.focus) {
      firstFocus?.focus()
    } else {
      firstFocus?.$el.focus()
    }
  },
  methods: {
    handleSubmit() {
      if (this.entry.id) {
        return this.handleUpdate(this.entry)
      }
      return this.handleCreate(this.entry)
    },
    initEdit() {
      this.typeScreen = 'edit'
      this.$repositories[this.repositoryName]
        .get(this.$route.params.id)
        .then((res) => {
          const data = res.data.results
          this.initData = { ...data }
          this.entry = { ...data }
        }).catch((response) => {
          this.$toast.error(response.message)
          this.dirtyCheck = false
          this.$router.push({
            name: 'Page404',
          })
      }).finally(() => {
      })
    },
    handleUpdate(data) {
      this.$repositories[this.repositoryName]
        .update(data.id, data)
        .then((response) => {
          this.$toast.success(response.data.message)
          this.dirtyCheck = false
          this.backToList()
        })
        .catch((response) => {
          this.$toast.error(response.message)
        }).finally(() => {
        })
    },
    handleCreate(params) {
      this.$repositories[this.repositoryName]
        .create(params)
        .then((response) => {
          this.$toast.success(response.data.message)
          this.dirtyCheck = false
          this.backToList()
        })
        .catch((response) => {
          this.$toast.error(response.message)
        }).finally(() => {
      })
    },
    leftRoute() {
      this.visibleCancelModal = false
      if (this.routeToLeave) {
        this.dirtyCheck = false
        this.visibleCancelModal = false
        this.$router.push(this.routeToLeave)
      }
    },
    checkDirty(to) {
      if (this.dirtyCheck) {
        this.visibleCancelModal = true
        this.routeToLeave = to
        return false
      }
    },
    backToList() {
      this.$router.push({
        name: this.routerListScreenName,
      })
    },

    scrollToTop() {
      window.scrollTo(0, 0)
    },

    isEditScreen() {
      return this.typeScreen === 'edit'
    }
  },
}
</script>

<template>
  <font-awesome-icon
    :icon="['fa-solid', displayIcon]"
    class="sort-icon"
  />
</template>

<script>
export default {
  name: 'SortIcon',
  props: {
    sort: {
      type: Object,
    },
    field: {
      type: String,
      default: '',
    },
  },
  computed: {
    displayIcon() {
      return this.displayOrderIcon()
    }
  },
  methods: {
    displayOrderIcon() {
      if (!this.sort) {
        return 'fa-sort'
      }
      const order = this.sort[this.field]
      switch (order) {
        case 'desc':
          return 'fa-sort-down'
        case 'asc':
          return 'fa-sort-up'
        default:
          return 'fa-sort'
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.sort-icon {
  margin-left: 3px;
}

.fa-sort-up {
  position: relative;
  top: 3px;
}

.fa-sort-down {
  position: relative;
  top: -3px;
}
</style>

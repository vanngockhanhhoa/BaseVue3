<template>
  <div class="d-flex">
    <span class="me-2 perpage-label">{{ $t('common.label_perpage') }}</span>
    <CFormSelect
      :options="perpageOptions"
      v-model="perPageText"
      class="perpage"
    />
  </div>
</template>

<script>
import { PAGINATION_OPTIONS } from '@/config/consts'

export default {
  name: 'DisplayPerPage',
  props: {
    perPage: {
      required: true,
      type: Number,
    },
    changePerPageFunc: {
      required: true,
      type: Function,
    },
  },
  data() {
    return {
      perPageText: this.perPage + '',
      perpageOptions: PAGINATION_OPTIONS,
    }
  },
  watch: {
    perPageText: function (value) {
      this.changePerPageFunc(value)
    },
  },
}
</script>

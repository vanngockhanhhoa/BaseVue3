<template>
   <CRow>
    <CCol :xs="12">
      <CCard class="field-contain-main">
        <loading :active="loading" style="test: test;" :is-full-page="false"></loading>
        <slot></slot>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import Loading from 'vue3-loading-overlay'
import { mapState } from 'pinia'
import { useCommonsStore } from '@/store/useCommonsStore'
export default {
  name: 'DefaultLayout',
  components: {
    Loading,
  },
  computed: {
    ...mapState(useCommonsStore, ['loading'])
  },
}
</script>

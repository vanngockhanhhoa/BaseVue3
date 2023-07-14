<template>
  <CModal
    :class="'modal_confirm'"
    :visible="visible"
    :selectedItem="selectedItem"
    @close="
      onClose
    "
  >
    <loading :active="fetching" :is-full-page="false"></loading>
    <CModalHeader>
      <CModalTitle>{{ $t('modals.popup.delete_title') }}</CModalTitle>
    </CModalHeader>
    <CModalBody class="text-wrap"><slot/></CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        class="btn-action btn-reset"
        @click="
          onClose
        "
      >
        {{ $t('buttons.no') }}
      </CButton>
      <CButton color="primary" class="btn-action" @click="handleDelete"> {{ $t('buttons.yes') }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import Loading from 'vue3-loading-overlay'
  export default {
    name: 'Confirm Delete Modal',
    components: {
      Loading
    },
    data() {
      return {
        visible: false,
        selectedItem: {}
      }
    },
    methods: {
      onClose() {
        this.$emit('onClose')
      },
      handleDelete() {
        this.$emit('handleDelete')
      }
    },

  }
</script>

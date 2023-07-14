<template>
  <CModal
    :class="'modal_confirm'"
    :visible="visible"
    @close="
      onClose
    "
  >
    <CModalHeader>
      <CModalTitle>{{ $t('common.modal_check_info.title') }}</CModalTitle>
    </CModalHeader>
    <CModalBody> {{ $t('common.modal_check_info.body') }}</CModalBody>
    <CModalFooter>
      <CButton
        class="btn-action btn-cancel me-2"
        color="secondary"
        @click="
          onClose
        "
      >
        {{ $t('buttons.no') }}
      </CButton>
      <CButton class="btn-action" color="primary" @click="leftRoute">{{
          $t('buttons.yes')
        }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
   export default {
     name: 'ModalCheckInfo',
     data() {
       return {
         visible: false,
       }
     },
     methods: {
       onClose() {
         this.$emit('onClose')
       },
        leftRoute() {
          this.$emit('leftRoute')
        },
     }

   }
</script>

<template>
  <CModal
    :class="'modal_confirm'"
    :visible="visible"
    @close="
      onClose
    "
  >
    <CModalHeader>
      <CModalTitle>{{ $t(title) }}</CModalTitle>
    </CModalHeader>
    <CModalBody><span v-html="$t(bodyContent)"></span><slot/></CModalBody>
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
  name: 'ConfirmModal',
  data() {
    return {
      visible: false,
    }
  },
  props: {
    title: {
      type: String,
      default: 'common.modal_check_info.title',
    },
    bodyContent: {
      type: String,
      default: null,
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

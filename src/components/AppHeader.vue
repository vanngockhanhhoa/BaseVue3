<template>
  <CHeader position="sticky" class="mb-3">
    <CContainer fluid class="d-flex justify-content-between align-items-center">
        <CHeaderToggler class="pt-2 d-xl-none border" @click="commonsStore.toggleSidebar()">
          <CIcon icon="cil-menu" size="lg" />
        </CHeaderToggler>
    </CContainer>
  </CHeader>
</template>

<script>
import { logo } from '@/assets/brand/logo'
import { useCommonsStore } from '@/store/useCommonsStore'
export default {
  name: 'AppHeader',
  data() {
    return {
      visibleLogoutModal: false,
    }
  },
  setup() {
    const commonsStore = useCommonsStore()
    return {
      logo,
      commonsStore
    }
  },
}
</script>

<template>
  <div>
    <AppSidebar />
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div class="body flex-grow-1 px-3 mb-2">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { mapActions } from 'pinia'
import { useCommonsStore } from '@/store/useCommonsStore'
export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
    AppSidebar,
  },
  methods: {
    ...mapActions(useCommonsStore, [
      'seenMessageClean',
      'seenMessageCustomer',
      'seenChannelCustomer',
      'seenMessageWH'
    ]),
  }
}
</script>

<template>
  <div>
    <AppSidebar />
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <CHeader position="sticky" class="mb-3">
        <CContainer fluid>
          <CBreadcrumb class="d-md-down-none me-auto mb-0">
            <CBreadcrumbItem
            >
              403エラー
            </CBreadcrumbItem>
          </CBreadcrumb>
        </CContainer>
      </CHeader>
      <div id="server-error">
        <div class="server-error">
          <div class="server-error-title">
            <h1>403</h1>
          </div>
          <h3>アクセス権限がないため、このページにアクセスすることができません。</h3>
          <h3>お手数ですが、事業者の管理者様までお問合せください。</h3>
          <h4><router-link :to="{name: routeRedirect}">ダッシュボードへ戻る</router-link></h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSidebar from '@/components/AppSidebar.vue'
export default {
  name: 'PagePermission',
  data () {
    return {
      routeRedirect: null,
    }
  },
  components: {
    AppSidebar,
  },
  created() {
    this.routeRedirect =  this.$auth.getUser().role === 'admin' ? 'HotelHome' : 'CleanHome'
  },
}
</script>

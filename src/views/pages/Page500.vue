<template>
  <div>
    <AppSidebar />
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <CHeader position="sticky" class="mb-3">
        <CContainer fluid>
          <CBreadcrumb class="d-md-down-none me-auto mb-0">
            <CBreadcrumbItem
            >
              Error 500
            </CBreadcrumbItem>
          </CBreadcrumb>
        </CContainer>
      </CHeader>
      <div id="server-error">
        <div class="server-error">
          <div class="server-error-title">
            <h1>500</h1>
          </div>
          <h2>Oops! Something went wrong.</h2>
          <p>Please try again later or feel free to contact us if the problem persists. <router-link to="/admin">Return to homepage</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSidebar from '@/components/AppSidebar.vue'

export default {
  name: 'Page500',
  components: {
    AppSidebar,
  },
}
</script>

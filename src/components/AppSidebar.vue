<template>
  <CSidebar
    position="fixed"
    :unfoldable="commonsStore.sidebarUnfoldable"
    :visible="commonsStore.sidebarVisible"
    @visible-change="
      (event) =>
        updateSidebarVisible({ value: event})
    "
  >
    <CSidebarBrand>
      <h5>RELAY SYSTEM</h5>
      <!-- <CIcon
        custom-class-name="sidebar-brand-full"
        :icon="logoNegative"
        :height="35"
      />
      <CIcon
        custom-class-name="sidebar-brand-narrow"
        :icon="sygnet"
        :height="35"
      /> -->
      <CTooltip :content="conditionalUsersInfo?.name" placement="top">
        <template #toggler="{ on }">
          <h4 v-on="on" class="sidebarbrand__nameuser">{{ conditionalUsersInfo?.name }}</h4>
        </template>
      </CTooltip>
    </CSidebarBrand>
    <div class="sidebar-group">
      <AppSidebarNav class="menu-nav" />
      <CSidebarNav>
        <CNavItem href="#" @click="openConfirmModal()">
          <CIcon customClassName="nav-icon" icon="cil-account-logout" />{{
            $t('menu.logout')
          }}
        </CNavItem>
      </CSidebarNav>

    </div>
    <!-- <CSidebarToggler
      class="d-none d-lg-flex"
      @click="$store.commit('toggleUnfoldable')"
    /> -->
  </CSidebar>
  <confirm-modal
    :title="'modals.logout_modal.title'"
    :body-content="'modals.logout_modal.content'"
    :visible="visibleLogoutModal"
    @onClose="visibleLogoutModal = false"
    @leftRoute="handleLogout"
  />
</template>

<script>
import { AppSidebarNav } from './AppSidebarNav'
import { logoNegative } from '@/assets/brand/logo-negative'
import { sygnet } from '@/assets/brand/sygnet'
import ConfirmModal from '@/components/Common/Modal/ConfirmModal.vue'
import { ACCESS_TOKEN_KEY, ACTOR_REDIRECTS } from '@/config/consts'
import { removeUserCookie } from '@/utils/functions'
import { mapState, mapActions} from 'pinia'
import { useCommonsStore } from '@/store/useCommonsStore'

export default {
  name: 'AppSidebar',
  components: {
    AppSidebarNav,
    ConfirmModal,
  },
  data() {
    return {
      visibleLogoutModal: false,
      channel_id: '',
    }
  },
  setup() {
    const commonsStore = useCommonsStore()
    return {
      logoNegative,
      sygnet,
      commonsStore,
    }
  },
  computed: {
    ...mapState(useCommonsStore, [
      'conditionalUsersInfo',
    ]),
  },
  created() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });
  },
  methods: {
    ...mapActions(useCommonsStore, ['updateSidebarVisible']),
    openConfirmModal() {
      this.visibleLogoutModal = true
    },
    handleLogout() {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      removeUserCookie()

      // redirect to login
      let pathAccess = localStorage.getItem('pathAccess');
      localStorage.removeItem('pathAccess');
      return window.location.href = ACTOR_REDIRECTS[pathAccess]
    },
  },
}
</script>
<style>
.menu-nav {
  flex: initial;
}
.message-title {
  color: var(--cui-sidebar-nav-link-color) !important;
  margin-right: 7px
}
.message-seen {
  background: red;color: #fff;
  width: 17px;
  line-height: 17px;
  font-size: 11px;
  text-align: center;
  border-radius: 99px;
}
.message-nav {
  display: flex;
  align-items: center;
  padding: var(--cui-sidebar-nav-link-padding-y) var(--cui-sidebar-nav-link-padding-x);
  color: var(--cui-sidebar-nav-link-color);
  text-decoration: none;
  white-space: nowrap;
  background: var(--cui-sidebar-nav-link-bg);
  border: var(--cui-sidebar-nav-link-border);
  border-radius: var(--cui-sidebar-nav-link-border-radius);
  transition: background 0.15s ease, color 0.15s ease;
  cursor: pointer;
}
</style>

import { defineStore } from "pinia";
import { USER_INFO_KEY } from "@/config/consts";

export const useCommonsStore = defineStore('commons', {
  state: () => {
    return {
      sidebarVisible: '',
      sidebarUnfoldable: false,
      loading: false,
      usersInfo: {},
      conditionSearch: {},
    }
  },

  getters: {
    conditionalUsersInfo: (state) => state.usersInfo.id ? state.usersInfo : JSON.parse(localStorage.getItem(USER_INFO_KEY))
  },

  actions: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible
    },
    toggleUnfoldable() {
      this.sidebarUnfoldable = !this.sidebarUnfoldable
    },
    updateSidebarVisible(payload) {
      this.sidebarVisible = payload.value
    },
    setUserInfo(payload) {
      this.usersInfo = payload
    },
    setConditionSearch(payload) {
      let key = payload?.searchs?.filter?.componentName || 'default'
      this.conditionSearch[key] = payload
    },
  }
})

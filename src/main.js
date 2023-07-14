import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import authPlugin from './plugins/auth'
import axiosPlugin from './plugins/axios'
import repositoryPlugin from './repositories/Repository'
import veeValidatePlugin from './plugins/vee-validate'
import VueCookies, { globalCookiesConfig } from 'vue3-cookies'
import customDirectives from './plugins/directives'
import filters from './plugins/filters'
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsCallout from '@/components/DocsCallout'
import DocsExample from '@/components/DocsExample'
import i18n from './i18n'
import Toaster from '@meforma/vue-toaster'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Vue3Linkify from 'vue-3-linkify'
import {
  faPen,
  faTrash,
  faEye,
  faForwardStep,
  faBackwardStep,
  faSort,
  faSortUp,
  faSortDown,
  faEnvelope,
  faLock,
  faXmark,
  faFileSignature,
  faUser,
  faClipboardList,
  faMinus,
  faCaretUp,
  faCaretDown,
  faArrowRightFromBracket,
  faSitemap,
  faDownload,
  faPlus,
  faCircleInfo,
  faHistory,
  faIdBadge,
  faWrench,
  faFileExport,
  faTimes,
  faDivide,
  faCheck,
  faObjectUngroup,
  faSave
} from '@fortawesome/free-solid-svg-icons'
import { TOAST_CONFIG } from './config/consts'
import './registerServiceWorker'

library.add(
  faPen,
  faTrash,
  faEye,
  faForwardStep,
  faBackwardStep,
  faSort,
  faSortDown,
  faSortUp,
  faEnvelope,
  faLock,
  faXmark,
  faFileSignature,
  faUser,
  faClipboardList,
  faMinus,
  faCaretUp,
  faCaretDown,
  faArrowRightFromBracket,
  faSitemap,
  faDownload,
  faPlus,
  faCircleInfo,
  faHistory,
  faIdBadge,
  faWrench,
  faFileExport,
  faTimes,
  faDivide,
  faCheck,
  faObjectUngroup,
  faSave
)

globalCookiesConfig({
  expireTimes: '30d',
  path: '/',
  domain: '',
  secure: true,
  sameSite: 'None',
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(CoreuiVue)
app.use(i18n)
app.use(Toaster, {
  position: 'top-right',
  duration: TOAST_CONFIG.goAwayTime,
})
app.use(VueAxios, axios)
app.use(VueCookies)
app.use(authPlugin, {})
app.use(axiosPlugin)
app.use(repositoryPlugin, {})
app.use(veeValidatePlugin, {})
app.use(filters)
app.use(customDirectives)
app.use(Vue3Linkify)

app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsCallout', DocsCallout)
app.component('DocsExample', DocsExample)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('VueDatePicker', VueDatePicker)


// global registration component
import PriceInput from "@/components/Common/PriceInput"
import sortIcon from '@/components/Common/SortIcon'
import DataTable from '@/components/Common/DataTable/DataTable'
import datatableTooltip from '@/components/Common/DataTable/Tooltip.vue'
import ConfirmDeleteModal from "@/components/Common/Modal/ConfirmDeleteModal.vue";
import ConfirmNavigation from "@/components/Common/Modal/ConfirmNavigation.vue";
import Loading from 'vue3-loading-overlay'
import { DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

app.component('PriceInput', PriceInput)
app.component('sortIcon', sortIcon)
app.component('DataTable', DataTable)
app.component('datatableTooltip', datatableTooltip)
app.component('ConfirmDeleteModal', ConfirmDeleteModal)
app.component('ConfirmNavigation', ConfirmNavigation)
app.component('DatePicker', DatePicker)
app.component('Loading', Loading)

app.mount('#app')

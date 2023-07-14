import { createI18n } from 'vue3-i18n'

import ja from './lang/ja'
import en from './lang/en'

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, ja },
})

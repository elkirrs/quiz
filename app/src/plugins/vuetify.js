import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import { en, ru } from 'vuetify/locale'
import { locale } from '@/i18n'

export default createVuetify({
  locale: { locale: locale.value, fallback: 'en', messages: { en, ru } },
  theme: {
    defaultTheme: 'dark',
  },
})

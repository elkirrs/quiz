import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import { en, ru } from 'vuetify/locale'
import { locale } from '@/i18n'

export default createVuetify({
  defaults: {
    VBtn: { rounded: 'lg' },
    VFab: { rounded: 'lg' },
    VChip: { rounded: 'lg' },
    VAvatar: { rounded: 'lg' },
    VProgressLinear: { rounded: 'lg' },
    VExpansionPanel: { rounded: 'lg' },
  },
  locale: { locale: locale.value, fallback: 'en', messages: { en, ru } },
  theme: {
    defaultTheme: 'dark',
  },
})

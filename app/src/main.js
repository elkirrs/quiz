/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { locale, translate, localizeMessage, LANGUAGE_STORAGE_KEY } from '@/i18n'

// Styles
import 'unfonts.css'

const app = createApp(App)
let languageStorageError = ''
try {
  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (savedLanguage === 'en' || savedLanguage === 'ru') locale.value = savedLanguage
} catch (error) {
  languageStorageError = error.message
}
app.config.globalProperties.$t = translate
app.config.globalProperties.$localizeMessage = localizeMessage
app.provide('languageStorageError', languageStorageError)
document.documentElement.lang = locale.value

registerPlugins(app)

app.mount('#app')

// Types
import { createPinia } from 'pinia'
import router from '../router/index.js'
/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */
import i18n from './i18n.js'
// Plugins
import vuetify from './vuetify.js'

export function registerPlugins (app) {
  app.use(vuetify)
  app.use(createPinia())
  app.use(i18n)
  app.use(router)
}

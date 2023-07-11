import '@/styles/global.scss'

import { Router } from './core/router/router'
import { devMode } from './config/dev.config'

import { notify } from './core/services/notification.service'
import { storageService } from './core/services/storage.service'

if (devMode) {
  window.notify = notify
  window.storageService = storageService()
}

new Router()

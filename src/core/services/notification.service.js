import { $R } from '../rquery/rquery.lib'

import styles from '@/components/layout/notification/notification.module.scss'

/**
 * NotificationService is a utility class to handle displaying notifications.
 * It can be used to display messages with different types (success, error) and manage the notification timeout.
 */
export class NotificationService {
  #timeout = null

  constructor(message, type) {
    this.message = message
    this.type = type

    this.#show()
  }

  #setTimeout(callback, duration) {
    if (this.#timeout) {
      clearTimeout(this.#timeout)
    }

    this.#timeout = setTimeout(callback, duration)
  }

  #show() {
    if (!['success', 'error'].includes(this.type)) {
      throw new Error('Invalid notification type.')
    }

    const notificationElement = $R('#notification')
    notificationElement.text(this.message).addClass(styles[this.type])

    this.#setTimeout(() => {
      notificationElement.removeClass(styles[this.type])
    }, 3500)
  }
}

/**
 * Show a notification with a specified message and type.
 * The notification will automatically hide after a specified duration.
 * @param {string} [message='success'] - The message to be displayed in the notification.
 * @param {('success'|'error')} type - The type of the notification, only 'success' or 'error' are accepted.
 */
export const notify = (message, type = 'success') => {
  return new NotificationService(message, type)
}

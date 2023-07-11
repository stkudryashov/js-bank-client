import { BaseChild } from '@/core/component/base-child.component.js'
import renderService from '@/core/services/render.service'

import template from './notification.template.html'
import styles from './notification.module.scss'

export class Notification extends BaseChild {
  render() {
    this.element = renderService.htmlToElement(template, styles, [])
    
    return this.element
  }
}

import { BaseChild } from '@/core/component/base-child.component.js'
import renderService from '@/core/services/render.service'

import template from './auth.template.html'
import styles from './auth.module.scss'

export class Auth extends BaseChild {
  render() {
    this.element = renderService.htmlToElement(template, styles, [])

    return this.element
  }
}

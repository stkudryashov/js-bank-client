import { BaseChild } from '@/core/component/base-child.component.js'
import renderService from '@/core/services/render.service'

import template from './header.template.html'
import styles from './header.module.scss'

export class Header extends BaseChild {
  render() {
    this.element = renderService.htmlToElement(template, styles)
    return this.element
  }
}

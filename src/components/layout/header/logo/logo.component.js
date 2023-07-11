import { BaseChild } from '@/core/component/base-child.component.js'
import renderService from '@/core/services/render.service'

import template from './logo.template.html'
import styles from './logo.module.scss'

export class Logo extends BaseChild {
  render() {
    this.element = renderService.htmlToElement(template, styles, [])
    
    return this.element
  }
}

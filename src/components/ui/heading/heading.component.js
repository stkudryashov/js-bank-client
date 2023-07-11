import { BaseChild } from '@/core/component/base-child.component.js'
import renderService from '@/core/services/render.service'

import template from './heading.template.html'
import styles from './heading.module.scss'

import { $R } from '@/core/rquery/rquery.lib'

export class Heading extends BaseChild {
  constructor(title = '') {
    super()

    this.title = title
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles)

    $R(this.element).text(this.title)

    return this.element
  }
}

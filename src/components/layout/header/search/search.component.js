import { BaseChild } from '@/core/component/base-child.component.js'
import renderService from '@/core/services/render.service'

import template from './search.template.html'
import styles from './search.module.scss'

import { $R } from '@/core/rquery/rquery.lib'

export class Search extends BaseChild {
  render() {
    this.element = renderService.htmlToElement(template, styles, [])

    $R(this.element).find('input').input({
      type: 'search',
      name: 'search',
      placeholder: 'Search contacts'
    })

    return this.element
  }
}

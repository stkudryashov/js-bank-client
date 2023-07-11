import { BaseChild } from '@/core/component/base-child.component'
import renderService from '@/core/services/render.service'

import styles from './field.module.scss'
import template from './field.template.html'

import { $R } from '@/core/rquery/rquery.lib'

export class Field extends BaseChild {
  constructor({ placeholder, name, variant, type = 'text', value = '' }) {
    super()

    if (!name) throw new Error('Please fill field "name".')

    this.placeholder = placeholder
    this.name = name
    this.variant = variant
    this.type = type
    this.value = value
  }

  render() {
    this.element = renderService.htmlToElement(template, styles, [])

    const inputElement = $R(this.element).find('input').input({
      placeholder: this.placeholder,
      name: this.name,
      type: this.type,
      value: this.value
    })

    if (this.type === 'number') {
      inputElement.numberInput()
    }

    const isCreditCard = this.variant === 'credit-card'

    if (isCreditCard) {
      inputElement.creditCardInput()
    }

    return this.element
  }
}

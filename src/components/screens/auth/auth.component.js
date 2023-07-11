import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'

import template from './auth.template.html'
import styles from './auth.module.scss'
import { Heading } from '@/components/ui/heading/heading.component'

export class Auth extends BaseScreen {
  constructor() {
    super({ title: 'Authorization' })
  }

  render() {
    this.element = renderService.htmlToElement(template, styles, [
      new Heading('Authorization')
    ])

    return this.element
  }
}

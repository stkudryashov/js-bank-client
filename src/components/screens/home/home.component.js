import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'

import template from './home.template.html'
import styles from './home.module.scss'

import { $R } from '@/core/rquery/rquery.lib'
import { Button } from '@/components/ui/button/button.component'

export class Home extends BaseScreen {
  constructor() {
    super({ title: 'Home' })
  }

  render() {
    const element = renderService.htmlToElement(template, styles, [
      new Button({
        children: 'Send',
        onClick: () => alert(element.classList),
        variant: 'green'
      })
    ])

    $R(element).find('p').css('color', 'red')

    return element
  }
}

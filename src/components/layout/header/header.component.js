import { BaseChild } from '@/core/component/base-child.component.js'
import renderService from '@/core/services/render.service'

import template from './header.template.html'
import styles from './header.module.scss'

import { Logo } from './logo/logo.component'
import { Search } from './search/search.component'
import { LogoutButton } from './logout-button/logout-button.component'

import { UserItem } from '@/components/ui/user-item/user-item.component'

export class Header extends BaseChild {
  constructor({ router }) {
    super()

    this.router = router
  }

  render() {
    this.element = renderService.htmlToElement(template, styles, [
      Logo,
      Search,
      new UserItem({
        avatarPath: 'https://loremflickr.com/512/512/cat',
        name: 'Kudryashov'
      }),
      new LogoutButton({
        router: this.router
      })
    ])

    return this.element
  }
}

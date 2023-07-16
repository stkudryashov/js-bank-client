import { BaseChild } from '@/core/component/base-child.component.js'
import renderService from '@/core/services/render.service'

import template from './header.template.html'
import styles from './header.module.scss'

import { Logo } from './logo/logo.component'
import { Search } from './search/search.component'
import { LogoutButton } from './logout-button/logout-button.component'

import { UserItem } from '@/components/ui/user-item/user-item.component'
import { Store } from '@/core/store/store'
import { $R } from '@/core/rquery/rquery.lib'

export class Header extends BaseChild {
  constructor({ router }) {
    super()

    this.store = Store.getInstance()
    this.store.addObserver(this)

    this.router = router

    this.userItem = new UserItem({
      avatarPath: '/',
      name: 'Unknown'
    })
  }

  update() {
    this.user = this.store.state.user
    const authSideElement = $R(this.element).find('#auth-side')

    if (this.user) {
      authSideElement.show()

      this.userItem.update(this.user)
      this.router.navigate('/')
    } else {
      authSideElement.hide()
    }
  }

  render() {
    this.element = renderService.htmlToElement(template, styles, [
      Logo,
      Search,
      this.userItem,
      new LogoutButton({
        router: this.router
      })
    ])

    this.update()

    return this.element
  }
}

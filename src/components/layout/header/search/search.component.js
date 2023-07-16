import { BaseChild } from '@/core/component/base-child.component.js'
import renderService from '@/core/services/render.service'

import template from './search.template.html'
import styles from './search.module.scss'

import { $R } from '@/core/rquery/rquery.lib'
import { UserService } from '@/api/user.service'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import { debounce } from '@/utils/debounce'

export class Search extends BaseChild {
  constructor() {
    super()

    this.userService = new UserService()
  }

  #handleSearch = async event => {
    const searchTerm = event.target.value
    const searchResultElement = $R(this.element).find('#search-results')

    if (!searchTerm) {
      searchResultElement.html('')
      return
    }

    await this.userService.getAll(searchTerm, users => {
      searchResultElement.html('')

      users.forEach((user, index) => {
        const userItem = new UserItem(user, true, () => {
          searchResultElement.html('')
        }).render()

        $R(userItem)
          .addClass(styles.item)
          .css('transition-delay', `${index * 0.1}s`)

        searchResultElement.append(userItem)

        setTimeout(() => {
          $R(userItem).addClass(styles.visible)
        }, 50)
      })
    })
  }

  render() {
    this.element = renderService.htmlToElement(template, styles, [])

    const debounceHandlerSearch = debounce(this.#handleSearch, 300)

    $R(this.element)
      .find('input')
      .input({
        type: 'search',
        name: 'search',
        placeholder: 'Search contacts'
      })
      .on('input', debounceHandlerSearch)

    return this.element
  }
}

import { Home } from '@/components/screens/home/home.component'
import { Layout } from '@/components/layout/layout.component'

import { ROUTES } from './routes.data'
import { $R } from '../rquery/rquery.lib'

export class Router {
  #routes = ROUTES
  #currentRoute = null
  #layoutInstance = null

  constructor() {
    window.addEventListener('popstate', () => {
      this.#handleRouteChange()
    })

    this.#handleRouteChange()
    this.#handleLinks()
  }

  getCurrentPath() {
    return window.location.pathname
  }

  #render() {
    const component = new this.#currentRoute.component().render()

    if (!this.#layoutInstance) {
      this.#layoutInstance = new Layout({
        router: this,
        children: component
      }).render()

      $R('#app').append(this.#layoutInstance)
    } else {
      $R('#content').html('').append(component)
    }
  }

  #navigate(path) {
    if (path !== this.getCurrentPath()) {
      window.history.pushState({}, '', path)
      this.#handleRouteChange()
    }
  }

  #handleRouteChange() {
    const path = this.getCurrentPath() || '/'

    let route = this.#routes.find(route => route.path === path)

    if (!route) {
      route = {
        component: Home
      }

      window.location.pathname = '/'
    }

    this.#currentRoute = route
    this.#render()
  }

  #handleLinks() {
    document.addEventListener('click', event => {
      const target = event.target.closest('a')

      if (target) {
        event.preventDefault()
        this.#navigate(target.href)
      }
    })
  }
}

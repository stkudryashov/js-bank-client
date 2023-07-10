import { Home } from '@/components/screens/home/home.component'
import { ROUTES } from './routes.data'
import { Layout } from '@/components/screens/layout/layout.component'

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
    const component = new this.#currentRoute.component()

    if (!this.#layoutInstance) {
      this.#layoutInstance = new Layout({
        router: this,
        children: component.render()
      })

      document.getElementById('app').innerHTML = this.#layoutInstance.render()
    } else {
      document.querySelector('main').innerHTML = component.render()
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

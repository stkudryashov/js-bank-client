import { Home } from '@/components/screens/home/home.component'
import { ROUTES } from './routes.data'

export class Router {
  #routes
  #currentRoute

  constructor() {
    this.#routes = ROUTES
    this.#currentRoute = null

    this.#handleRouteChange()
  }

  getCurrentPath() {
    return window.location.pathname
  }

  render() {
    const component = new this.#currentRoute.component()
    document.getElementById('app').innerHTML = component.render()
  }

  #handleRouteChange() {
    const path = this.getCurrentPath() || '/'

    let route = this.#routes.find(route => route.path === path)

    if (!route) {
      route = {
        component: Home
      }
    }

    this.#currentRoute = route
    this.render()
  }
}

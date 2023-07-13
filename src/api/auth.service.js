import { redQuery } from '@/core/red-query/red-query.lib'
import { notify } from '@/core/services/notification.service'
import { Store } from '@/core/store/store'

export class AuthService {
  #BASE_URL = '/auth'

  constructor() {
    this.store = Store.getInstance()
  }

  login({ login, password }) {
    return redQuery({
      path: `${this.#BASE_URL}/login`,
      method: 'POST',
      body: { login, password },
      onSuccess: data => {
        this.store.login(data.user, data.accessToken)
        notify('You have successfully logged in.')
      }
    })
  }

  register({ login, password }) {
    return redQuery({
      path: `${this.#BASE_URL}/register`,
      method: 'POST',
      body: { login, password },
      onSuccess: data => {
        this.store.login(data.user, data.accessToken)
        notify('You have successfully registered.')
      }
    })
  }
}

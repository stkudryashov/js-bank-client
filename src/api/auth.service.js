import { redQuery } from '@/core/red-query/red-query.lib'
import { notify } from '@/core/services/notification.service'

export class AuthService {
  #BASE_URL = '/auth'

  login({ login, password }) {
    return redQuery({
      path: `${this.#BASE_URL}/login`,
      method: 'POST',
      body: { login, password },
      onSuccess: data => {
        notify('You have successfully logged in.')
      }
    })
  }

  register({ login, password }) {
    return redQuery({
      path: `${this.#BASE_URL}/login`,
      method: 'POST',
      body: { login, password },
      onSuccess: data => {
        notify('You have successfully registered.')
      }
    })
  }
}

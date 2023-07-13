import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'

import template from './auth.template.html'
import styles from './auth.module.scss'

import { Field } from '@/components/ui/field/field.component'
import { Button } from '@/components/ui/button/button.component'
import { AuthService } from '@/api/auth.service'
import { $R } from '@/core/rquery/rquery.lib'

export class Auth extends BaseScreen {
  #isTypeLogin = true

  constructor() {
    super({ title: 'Authorization' })

    this.authService = new AuthService()
  }

  #handleSubmit = event => {
    console.log(event.target)
  }

  #changeFormType = event => {
    event.preventDefault()

    const text = this.#isTypeLogin ? 'Register' : 'Sign in'

    $R(this.element).find('h1').text(text)
    $R(event.target).text(text)

    this.#isTypeLogin = !this.#isTypeLogin
  }

  render() {
    this.element = renderService.htmlToElement(template, styles, [
      new Field({
        placeholder: 'Enter email',
        name: 'email',
        type: 'email'
      }),
      new Field({
        placeholder: 'Enter password',
        name: 'password',
        type: 'password'
      }),
      new Button({
        children: 'Submit'
      })
    ])

    $R(this.element).find('#change-form-type').click(this.#changeFormType)
    $R(this.element).find('form').submit(this.#handleSubmit)

    return this.element
  }
}

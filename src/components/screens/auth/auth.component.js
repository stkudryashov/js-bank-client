import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'

import template from './auth.template.html'
import styles from './auth.module.scss'

import { Field } from '@/components/ui/field/field.component'
import { Button } from '@/components/ui/button/button.component'
import { AuthService } from '@/api/auth.service'
import { $R } from '@/core/rquery/rquery.lib'
import formService from '@/core/services/form.service'

import validationService from '@/core/services/validation.service'

export class Auth extends BaseScreen {
  #isTypeLogin = true

  constructor() {
    super({ title: 'Authorization' })

    this.authService = new AuthService()
  }

  #validateFields(formValues) {
    const emailLabel = $R(this.element).find('label:first-child')
    const passwordLabel = $R(this.element).find('label:last-child')

    if (!formValues.email) {
      validationService.showError(emailLabel)
    }

    if (!formValues.password) {
      validationService.showError(passwordLabel)
    }

    return formValues.email && formValues.password
  }

  #handleSubmit = event => {
    const formValues = formService.getFormValues(event.target)
    if (!this.#validateFields(formValues)) return

    if (this.#isTypeLogin) {
      this.authService.login(formValues)
    } else {
      this.authService.register(formValues)
    }
  }

  #changeFormType = event => {
    event.preventDefault()

    $R(this.element)
      .find('h1')
      .text(this.#isTypeLogin ? 'Register' : 'Sign in')

    $R(event.target).text(this.#isTypeLogin ? 'Sign in' : 'Register')

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

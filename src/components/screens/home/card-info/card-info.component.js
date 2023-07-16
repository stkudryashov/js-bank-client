import { BaseChild } from '@/core/component/base-child.component.js'
import renderService from '@/core/services/render.service'

import template from './card-info.template.html'
import styles from './card-info.module.scss'

import { CardService } from '@/api/card.service'
import { Store } from '@/core/store/store'
import { $R } from '@/core/rquery/rquery.lib'

import { formatCardNumber } from '@/utils/format/format-card-number'
import { formatToCurrency } from '@/utils/format/format-to-currency'

const CODE = '*****'

export class CardInfo extends BaseChild {
  constructor() {
    super()

    this.store = Store.getInstance()
    this.cardService = new CardService()

    this.element = renderService.htmlToElement(template, styles, [])
  }

  #copyCardNumber(event) {
    navigator.clipboard
      .writeText(event.target.innerText.replaceAll(' ', ''))
      .then(() => {
        event.target.innerText = 'Card number copied!'

        setTimeout(() => {
          event.target.innerText = formatCardNumber(this.card.number)
        }, 2000)
      })
  }

  #toggleCode(cardCodeElement) {
    const text = cardCodeElement.text()

    text === CODE
      ? cardCodeElement.text(this.card.cvc)
      : cardCodeElement.text(CODE)
  }

  fillElements() {
    $R(this.element).html(
      renderService.htmlToElement(template, styles, []).innerHTML
    )

    $R(this.element)
      .findAll(':scope > div')
      .forEach(child => {
        child.addClass('fade-in')
      })

    $R(this.element)
      .find('#card-number')
      .text(formatCardNumber(this.card.number))
      .click(this.#copyCardNumber.bind(this))

    $R(this.element).find('#card-expire-date').text(this.card.expireDate)

    const cardCodeElement = $R(this.element).find('#card-cvc')
    cardCodeElement.text(CODE).css('width', '44px')

    $R(this.element)
      .find('#toggle-cvc')
      .click(this.#toggleCode.bind(this, cardCodeElement))

    $R(this.element)
      .find('#card-balance')
      .text(formatToCurrency(this.card.balance))
  }

  fetchData() {
    this.cardService.byUser(data => {
      if (data?.id) {
        this.card = data
        this.fillElements()
        this.store.updateCard(data)
      } else {
        this.store.updateCard(null)
      }
    })
  }

  render() {
    if (this.store.state.user) this.fetchData()

    return this.element
  }
}

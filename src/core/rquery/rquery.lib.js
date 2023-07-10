/**
 * Represents the RQuery class for working with DOM elements.
 */
class RQuery {
  /**
   * Create a new RQuery instance.
   * @param {string|HTMLElement} selector - CSS selector string or HTMLElement.
   */
  constructor(selector) {
    if (typeof selector === 'string') {
      this.element = document.querySelector(selector)

      if (this.element) {
        throw new Error(`Element ${selector} not found.`)
      }
    } else if (selector instanceof HTMLElement) {
      this.element = selector
    } else {
      throw new Error('Invalid selector type.')
    }
  }

  /**
   * Find the first element that matches the specified selector within the selected element.
   * @param {string} selector - CCS selector string to search for within the selected element.
   * @returns {RQuery} A new RQuery instance for the found element.
   */
  find(selector) {
    const element = new RQuery(this.element.querySelector(selector))

    if (element) {
      return element
    } else {
      throw new Error(`Element ${selector} not found.`)
    }
  }

  /**
   * Set the CSS style of the selected element.
   * @param {string} property - CSS property to set.
   * @param {string} value - The value to set for the CSS property.
   * @returns {RQuery} The current RQuery instance for chaining.
   */
  css(property, value) {
    if (typeof property !== 'string' || typeof value !== 'string') {
      throw new Error('Property and value must be strings.')
    }

    this.element.style[property] = value
    return this
  }
}

/**
 * Create a new RQuery instance for the given selector.
 * @param {string|HTMLElement} selector - CSS selector string or HTMLElement.
 * @returns {RQuery} A new RQuery instance for the given selector.
 */
export const $R = selector => {
  return new RQuery(selector)
}

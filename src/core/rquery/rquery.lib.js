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

      if (!this.element) {
        throw new Error(`Element ${selector} not found.`)
      }
    } else if (selector instanceof HTMLElement) {
      this.element = selector
    } else {
      throw new Error('Invalid selector type.')
    }
  }

  /* FIND */

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

  /* INSERT */

  /**
   * Append a new element as a child of the selected element.
   * @param {HTMLElement} childElement - Child element to append.
   * @returns {RQuery} The current RQuery instance for chaining.
   */
  append(childElement) {
    if (!(childElement instanceof HTMLElement)) {
      throw new Error('Child element must be HTMLElement.')
    }

    this.element.appendChild(childElement)
    return this
  }

  /**
   * Insert a new element before the selected element.
   * @param {HTMLElement} newElement -The new element to insert before the selected element.
   * @returns {RQuery} The current RQuery instance for chaining.
   */
  before(newElement) {
    if (!(newElement instanceof HTMLElement)) {
      throw new Error('New element must be HTMLElement.')
    }

    const parentElement = this.element.parentElement

    if (parentElement) {
      parentElement.insertBefore(newElement, this.element)
      return this
    } else {
      throw Error('Element does not have parent element.')
    }
  }

  /**
   * Get or set inner HTML of the current element.
   * @param {HTMLElement|string} [htmlContent] - Optional HTML content to set.
   * If not provided, the current inner HTML will be returned.
   * @returns {RQuery|string} The current RQuery instance for chaining when
   * setting HTML content, or the current inner HTML.
   */
  html(htmlContent) {
    if (typeof htmlContent === 'undefined') {
      return this.element.innerHTML
    } else {
      this.element.innerHTML = htmlContent
      return this
    }
  }

  /* EVENTS */

  /**
   * Attach a click event listener to the selected element.
   * @param {function(Event): void} callback - The event listener function to execute when the
   * selected element is clicked. The function will receive the event object as its argument.
   * @returns {RQuery} The current RQuery instance for chaining.
   */
  click(callback) {
    this.element.addEventListener('click', callback)
    return this
  }

  /* STYLES */

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

  /**
   * Adds a class or a list of classes to the current element.
   * @param {string | string[]} classNames - A single class name or an array of class names to add to the element.
   * @returns {RQuery} The current RQuery instance for chaining.
   */
  addClass(classNames) {
    if (Array.isArray(classNames)) {
      for (const className of classNames) {
        this.element.classList.add(className)
      }
    } else {
      this.element.classList.add(classNames)
    }

    return this
  }

  /**
   * Removes a class or a list of classes from the current element.
   * @param {string | string[]} classNames - A single class name or an array of class names to remove from the element.
   * @returns {RQuery} The current RQuery instance for chaining.
   */
  removeClass(classNames) {
    if (Array.isArray(classNames)) {
      for (const className of classNames) {
        this.element.classList.remove(className)
      }
    } else {
      this.element.classList.remove(classNames)
    }

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

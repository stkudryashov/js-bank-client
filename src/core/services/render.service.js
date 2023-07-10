import { BaseChild } from '../component/base-child.component'

class RenderService {
  /**
   * Converts an HTML string into a DOM element, applies styles, and replaces component tags.
   * @param {string} html - The HTML string to convert.
   * @param {Object} styles - The styles to apply to the element.
   * @param {Array} components - An array of component classes to replace component tags.
   * @returns {HTMLElement} - The converted DOM element.
   */
  htmlToElement(html, styles, components = []) {
    const template = document.createElement('template')
    template.innerHTML = html.trim()

    const element = template.content.firstChild

    if (styles) {
      this.#applyModuleStyles(element, styles)
    }

    this.#replaceComponentTags(element, components)

    return element
  }

  /**
   * Replaces component tags with rendered components.
   * @private
   * @param {HTMLElement} parentElement - The parent element to search for component tags.
   * @param {Array} components - An array of component classes to replace component tags.
   */
  #replaceComponentTags(parentElement, components) {
    const componentTagPattern = /^component-/
    const allElements = parentElement.getElementsByTagName('*')

    for (const element of allElements) {
      const elementTagName = element.tagName.toLowerCase()

      if (componentTagPattern.test(elementTagName)) {
        const componentName = elementTagName
          .replace(componentTagPattern, '')
          .replace(/-/g, '')

        const foundComponent = components.find(Component => {
          const instance =
            Component instanceof BaseChild ? Component : new Component()

          return instance.constructor.name.toLowerCase() === componentName
        })

        if (foundComponent) {
          const componentContent =
            foundComponent instanceof BaseChild
              ? foundComponent.render()
              : new foundComponent().render()
          element.replaceWith(componentContent)
        } else {
          console.error(
            `Component ${componentName} not found in the provided components array.`
          )
        }
      }
    }
  }

  /**
   * Applies module styles to the element and its child elements.
   * @private
   * @param {HTMLElement} element - The element to apply styles to.
   * @param {Object} moduleStyles - The module styles to apply.
   */
  #applyModuleStyles(element, moduleStyles) {
    if (!element) return

    const applyStyles = element => {
      for (const [key, value] of Object.entries(moduleStyles)) {
        if (element.classList.contains(key)) {
          element.classList.remove(key)
          element.classList.add(value)
        }
      }
    }

    if (element.getAttribute('class')) {
      applyStyles(element)
    }

    const childElements = element.querySelectorAll('*')
    childElements.forEach(applyStyles)
  }
}

export default new RenderService()

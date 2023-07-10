import { getGlobalTitle } from '@/config/seo.config'

export class BaseScreen {
  /**
   * Create a new BaseScreen instance.
   * @param {Object} options - The options for the screen.
   * @param {String} options.title - The title for the screen.
   */
  constructor({ title }) {
    document.title = getGlobalTitle(title)
  }

  /**
   * Render the child component content.
   * @returns {HTMLElement}
   */
  render() {
    throw new Error('Render method must be implemented in child class')
  }
}

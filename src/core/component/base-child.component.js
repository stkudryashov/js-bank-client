export class BaseChild {
  /**
   * Render the child component content.
   * @returns {HTMLElement}
   */
  render() {
    throw new Error('Render method must be implemented in child class')
  }
}

// Singleton pattern

import { ACCESS_TOKEN_KEY, USER_STORAGE_KEY } from '@/constants/auth.constants'
import { storageService } from '../services/storage.service'

/**
 * Store class implements the Singleton pattern, providing a
 * centralized storage and state management solution.
 * It manages user login/logout and notifies observers of
 * any changes in the state.
 */
export class Store {
  /**
   * Create a new Store instance.
   * @param {Object} initialState - The initial state of the store.
   */
  constructor(initialState) {
    this.observers = []

    const savedUser = storageService.getItem(USER_STORAGE_KEY)
    const state = savedUser ? { user: savedUser } : initialState

    this.state = new Proxy(state, {
      set: (target, property, value) => {
        target[property] = value

        this.sendUpdate()
        return true
      }
    })
  }

  /**
   * Get the singleton Store instance.
   * @returns {Store} Singleton Store instance.
   */
  static getInstance() {
    if (!Store.instance) {
      Store.instance = new Store({ user: null })
    }
    return Store.instance
  }

  /**
   * Add an observer to the store list of observers.
   * @param {Object} observer - The observer object to add.
   */
  addObserver(observer) {
    this.observers.push(observer)
  }

  /**
   * Remove an observer to the store list of observers.
   * @param {Object} observer - The observer object to remove.
   */
  removeObserver(observer) {
    this.observers = this.observers.filter(current => current !== observer)
  }

  /**
   * Notify all observers of the state changes.
   */
  sendUpdate() {
    for (const observer of this.observers) {
      observer.update()
    }
  }

  /**
   * Login user and update the state and storage service.
   * @param {Object} user - The user object to login.
   */
  login(user, accessToken) {
    this.state.user = user
    storageService.setItem(USER_STORAGE_KEY, user)
    storageService.setItem(ACCESS_TOKEN_KEY, accessToken)
  }

  /**
   * Logout user and update the state and storage service.
   */
  logout() {
    this.state.user = null
    storageService.removeItem(USER_STORAGE_KEY)
    storageService.removeItem(ACCESS_TOKEN_KEY)
  }

  /**
   * Update user card.
   * @param {Object} card The card object.
   */
  updateCard(card) {
    const oldUser = this.state.user
    const newUser = { ...oldUser, card }

    this.state.user = newUser
    storageService.setItem(USER_STORAGE_KEY, newUser)
  }
}

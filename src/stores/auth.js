import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),
  
  actions: {
    login(credentials) {
      // Mock authentication
      if (credentials.email && credentials.password) {
        this.user = {
          id: 1,
          email: credentials.email,
          name: 'User'
        }
        this.isAuthenticated = true
        localStorage.setItem('ticketapp_session', JSON.stringify(this.user))
        return true
      }
      return false
    },
    
    signup(userData) {
      // Mock signup
      this.user = {
        id: 1,
        email: userData.email,
        name: userData.name
      }
      this.isAuthenticated = true
      localStorage.setItem('ticketapp_session', JSON.stringify(this.user))
      return true
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('ticketapp_session')
    },
    
    initialize() {
      const session = localStorage.getItem('ticketapp_session')
      if (session) {
        this.user = JSON.parse(session)
        this.isAuthenticated = true
      }
    }
  }
})
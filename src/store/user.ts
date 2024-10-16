import { defineStore } from 'pinia'

type User = {
  name: string
} | null

export const useUserStore = defineStore('user', {
  state: (): { user: User } => {
    return {
      user: null
    }
  },
  actions: {
    login() {
      this.setUser({ name: 'moby' })
    },
    logout() {
      this.setUser(null)
    },
    setUser(user: User) {
      this.user = user
    }
  }
})

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
    login(payload: { username: string; password: string }) {
      fetch(import.meta.env.VITE_APP_BASE_URL + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then((res) => res.json())
        .then((res) => {
          this.setUser({ name: res.username })
          localStorage.setItem('token', res.token)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    logout() {
      this.setUser(null)
    },
    setUser(user: User) {
      this.user = user
    }
  }
})

import { defineStore } from 'pinia'

type User = {
  name: string
} | null

export const useUserStore = defineStore('user', {
  state: (): { user: User; showLogin: boolean } => {
    return {
      user: null,
      showLogin: false
    }
  },
  actions: {
    login(payload: { username: string; password: string }) {
      return new Promise((resolve, reject) => {
        fetch(import.meta.env.VITE_APP_BASE_URL + '/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.code === 200) {
              this.setUser({ name: res.username })
              localStorage.setItem('token', res.token)
              resolve(true)
            } else {
              reject(res.message)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    logout() {
      this.setUser(null)
      localStorage.removeItem('token')
    },
    setUser(user: User) {
      this.user = user
    }
  }
})

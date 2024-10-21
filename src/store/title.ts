import { defineStore } from 'pinia'

export const useTitleStore = defineStore('title', {
  state: () => {
    return {
      subTitle: ''
    }
  },
  actions: {
    setSubTitle(subTitle: string) {
      this.subTitle = subTitle
    }
  }
})

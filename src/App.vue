<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/store/user'
const useUser = useUserStore()
onMounted(() => {
  fetch(import.meta.env.VITE_APP_BASE_URL + '/verifyToken', {
    headers: { authorization: localStorage.getItem('token') || '' }
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code == 200) {
        useUser.setUser({ name: res.username })
      } else {
        useUser.setUser(null)
      }
    })
    .catch(() => {
      useUser.setUser(null)
    })
})
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>

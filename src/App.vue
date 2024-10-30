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
      console.log(res)
      useUser.setUser({ name: res.username })
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

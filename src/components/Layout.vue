<template>
  <div class="relative w-[10rem] h-[5.625rem] relative flex flex-col bg">
    <div class="text-white absolute left-[30px] top-[30px] text-[20px]">
      {{ formatted }}
    </div>
    <div class="title_bg flex justify-center text-center">
      <svg class="mt-[10px] h-[60px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 50">
        <defs>
          <path id="smilePath" d="M 50,25 Q 250,50 450,25" fill="transparent" />
        </defs>
        <text font-family="Arial" style="font-size: 0.2rem" fill="#B7DBFF">
          <textPath href="#smilePath" startOffset="50%" text-anchor="middle">
            作业辅助决策系统
          </textPath>
        </text>
      </svg>
    </div>
    <div class="absolute z-10 right-[50px] top-[30px] cursor-pointer text-white text-[20px]">
      <div v-if="userStore.user" class="flex items-center" @click="logout">
        <img class="size-[40px]" src="@/assets/images/logout.svg" alt="" />
        <span class="ml-[10px]">{{ userStore.user.name }}</span>
      </div>
      <div class="flex items-center" @click="login" v-else>
        <img class="size-[40px]" src="@/assets/images/user.svg" alt="" />
        <span class="ml-[10px]">登录</span>
      </div>
    </div>
    <div class="absolute left-[30px] flex h-full items-center">
      <img class="h-[900px]" src="@/assets/images/l-d.png" />
    </div>
    <div class="absolute right-[30px] flex h-full items-center">
      <img class="h-[900px]" src="@/assets/images/r-d.png" />
    </div>
    <div class="absolute bottom-[0px] flex items-end">
      <img class="w-full" src="@/assets/images/b-d.png" />
    </div>
    <router-view></router-view>
    <div class="absolute inset-0" v-if="showLogin">
      <div class="bg-black opacity-80 size-full"></div>
      <div class="login-bg z-10 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useDateFormat, useNow } from '@vueuse/core'
import { useUserStore } from '@/store/user.ts'
import { ref } from 'vue'
const showLogin = ref(false)
const userStore = useUserStore()
const formatted = useDateFormat(useNow(), 'YYYY/MM/DD HH:mm')

const login = () => {
  userStore.login({ username: 'admin', password: 'admin' })
}
const logout = () => {
  userStore.logout()
}
</script>
<style scoped>
.bg {
  background: url('@/assets/images/home-bg.png') no-repeat center center;
  background-size: cover;
  position: relative;
}
.title_bg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 120px;
  background: url('@/assets/images/home-title-bg.png') no-repeat center center;
  background-size: contain;
}
.login-bg {
  width: 400px;
  height: 200px;
  background: url('@/assets/images/bg-2.png') no-repeat center center;
  background-size: contain;
}
</style>

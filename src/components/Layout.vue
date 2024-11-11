<template>
  <div class="relative w-[10rem] h-[5.625rem] relative flex flex-col bg">
    <div class="text-white absolute left-[30px] font-bold top-[30px] text-[20px]">
      {{ formatted }}
    </div>
    <div class="title_bg flex justify-center text-center">
      <svg class="mt-[10px] h-[60px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 50">
        <defs>
          <path id="smilePath" d="M 50,25 Q 250,50 450,25" fill="transparent" />
        </defs>
        <text font-family="Arial" style="font-size: 0.25rem" fill="#B7DBFF">
          <textPath href="#smilePath" startOffset="50%" text-anchor="middle">
            作业辅助决策系统
          </textPath>
        </text>
      </svg>
    </div>
    <div class="absolute z-10 right-[50px] top-[30px] cursor-pointer text-white text-[20px]">
      <div v-if="userStore.user" class="flex items-center" @click="logout">
        <img class="size-[40px]" src="@/assets/images/logout.svg" alt="" />
        <span class="ml-[10px] font-bold">{{ userStore.user.name }}</span>
      </div>
      <div class="flex items-center" @click="showLogin = true" v-else>
        <img class="size-[40px]" src="@/assets/images/user.svg" alt="" />
        <span class="ml-[10px] font-bold">登录</span>
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
    <div class="absolute inset-0" v-if="userStore.showLogin">
      <div class="bg-[#2F5584] opacity-80 size-full"></div>
      <div
        class="w-[600px] bg-[#14305C] h-[400px] z-10 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2"
      >
        <div class="text-white text-center text-[30px] mt-[50px]">欢迎登录</div>
        <div class="leading-[30px] flex flex-col items-center mt-[50px]">
          <input
            v-model="user.username"
            class="border h-[50px] px-[10px] mb-[30px] w-[300px] border-1 border-white rounded-[10px]"
            placeholder="请输入账号"
          />

          <input
            v-model="user.password"
            class="border h-[50px] px-[10px] w-[300px] border-1 border-white rounded-[10px]"
            type="password"
            placeholder="请输入密码"
          />
          <div
            class="text-red-600 text-[20px] bottom-[90px] absolute text-center"
            v-if="loginError"
          >
            {{ loginError }}
          </div>
          <button
            @click="login"
            class="text-[22px] cursor-pointer border-none rounded-[10px] mt-[40px] text-white bg-[#0070C0] h-[50px] w-[120px]"
          >
            登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useDateFormat, useNow } from '@vueuse/core'
import { useUserStore } from '@/store/user.ts'
import { reactive, ref } from 'vue'
const loginError = ref('')
const userStore = useUserStore()
const formatted = useDateFormat(useNow(), 'YYYY/MM/DD HH:mm')
const user = reactive({ username: '', password: '' })
const login = async () => {
  try {
    await userStore.login({ username: user.username, password: user.password })
    userStore.showLogin = false
  } catch (error) {
    loginError.value = error
  }
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
</style>

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
      <div class="flex items-center" @click="userStore.showLogin = true" v-else>
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
      <div class="bg-[#2F5584] opacity-80 size-full" @click="userStore.showLogin = false"></div>
      <div
        class="w-[600px] bg-white rounded-[10px] h-[600px] z-10 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2"
      >
        <div class="flex justify-center items-center text-[30px] mt-[50px]">
          <span class="gradient_1"></span>
          <span class="text-[#1C4187] font-bold px-[5px]">欢迎登录</span>
          <span class="gradient_2"></span>
        </div>
        <div class="leading-[30px] flex flex-col mx-[80px] mt-[100px]">
          <div class="text-[25px] text-[#999]">用户名称</div>
          <input
            v-model="user.username"
            class="h-[50px] border-none px-[10px] mb-[30px] w-full"
            placeholder="请输入账号"
          />
          <div class="text-[25px] text-[#999] mt-[50px]">用户密码</div>
          <input
            v-model="user.password"
            class="h-[50px] border-none px-[10px] w-full"
            type="password"
            placeholder="请输入密码"
          />
          <div
            class="text-red-600 text-[20px] bottom-[120px] -translate-x-1/2 left-1/2 absolute"
            v-if="loginError"
          >
            {{ loginError }}
          </div>
          <div class="flex justify-center mt-[30px]">
            <button
              @click="login"
              class="text-[22px] cursor-pointer border-none rounded-[30px] mt-[40px] text-white bg-[#094087] h-[60px] w-[300px]"
            >
              登录
            </button>
          </div>
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
.gradient_1 {
  opacity: 0.5;
  display: inline-block;
  width: 30%;
  height: 5px; /* 横线的高度 */
  background: linear-gradient(to right, rgba(14, 59, 112, 0) 0%, rgba(14, 59, 112, 1) 100%);
}
.gradient_2 {
  opacity: 0.5;
  display: inline-block;
  width: 30%;
  height: 5px; /* 横线的高度 */
  background: linear-gradient(to left, rgba(14, 59, 112, 0) 0%, rgba(14, 59, 112, 1) 100%);
}
input {
  border-bottom: 0.5px solid #999;
  outline: none;
  font-size: 28px;
  &::placeholder {
    color: #999;
    font-size: 25px;
  }
}
</style>

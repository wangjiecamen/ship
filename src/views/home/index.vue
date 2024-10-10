<template>
  <div class="bg w-screen h-screen">
    <div class="text-white absolute left-5 top-5 text-lg">{{ formatted }}</div>
    <div class="title_bg text-center">
      <svg class="mt-[18px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 50" height="50">
        <defs>
          <path id="smilePath" d="M 50,25 Q 250,50 450,25" fill="transparent" />
        </defs>
        <text font-family="Arial" font-size="40" fill="#B7DBFF">
          <textPath href="#smilePath" startOffset="50%" text-anchor="middle">
            作业辅助决策系统
          </textPath>
        </text>
      </svg>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useDateFormat, useNow } from '@vueuse/core'
const formatted = useDateFormat(useNow(), 'YYYY/MM/DD HH:mm')
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
  background-size: cover;
}
</style>

<template>
  <div class="text-center">
    <div class="text-[#B4D7FD] text-[30px] mt-[40px] text-center">请先确认当前平台状态</div>

    <div class="flex flex-col items-center mt-[50px]">
      <div
        @click="router.push(`/error-handler/operation-error/detail?v=${DetailType.插销无法拔出1}`)"
        class="button mb-[40px]"
      >
        平台未入水
      </div>
      <div
        @click="router.push(`/error-handler/operation-error/detail?v=${DetailType.插销无法拔出2}`)"
        class="button"
      >
        平台已入水
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useTitleStore } from '@/store/title.ts'
import { useRouter } from 'vue-router'
import { DetailType } from '@/views/error-handler/constants.ts'

const useTitle = useTitleStore()
const router = useRouter()
useTitle.setSubTitle('异常排查处理-插销无法拔出')
const goTo = () => {}
</script>

<style scoped lang="scss"></style>

<template>
  <div class="context">
    <div class="mt-[10px] ml-[10px]">
      <slot name="title"></slot>
    </div>
    <div @click="goBack" class="flex cursor-pointer items-center mt-[66px] ml-[60px]">
      <img class="size-[60px]" src="@/assets/images/back.svg" />
      <slot name="sub-title"></slot>
    </div>
    <div class="h-[470px] overflow-auto mt-[20px] mx-[50px]">
      <slot name="context"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => {
  router.back()
}
</script>

<style scoped lang="less">
.context {
  position: absolute;
  left: 50%;
  top: 200px;
  transform: translateX(-50%);
  background: url('@/assets/images/context.png') no-repeat center center;
  width: 1810px;
  height: 720px;
  background-size: contain;
}
</style>

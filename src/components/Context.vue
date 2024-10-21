<template>
  <div class="context">
    <div class="mt-[10px] ml-[10px]">
      <Title :icon="icon" :title="name"></Title>
    </div>
    <div @click="goBack" class="flex cursor-pointer absolute top-[150px] items-center left-[60px]">
      <img class="size-[45px]" src="@/assets/images/back.svg" />
      <div class="text-[#ACD1F9] text-[30px]">
        {{ route.meta.title || useTitle.subTitle }}
      </div>
    </div>
    <div class="h-[470px] absolute left-1/2 -translate-x-1/2 overflow-auto w-[90%] top-[240px]">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Title from '@/components/Title.vue'
import { useRoute, useRouter } from 'vue-router'
import { useTitleStore } from '@/store/title.ts'

defineProps<{ icon: string; name: string }>()
const router = useRouter()
const route = useRoute()
const useTitle = useTitleStore()
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

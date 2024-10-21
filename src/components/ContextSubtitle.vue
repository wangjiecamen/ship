<template>
  <div @click="goBack" class="flex cursor-pointer absolute top-[50px] items-center left-[60px]">
    <img class="size-[45px]" src="@/assets/images/back.svg" />
    <div class="text-[#ACD1F9] text-[30px]">{{ subTitle }}</div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

defineProps<{ subTitle: string }>()
const router = useRouter()
const goBack = () => {
  router.back()
}
</script>

<style scoped lang="scss"></style>

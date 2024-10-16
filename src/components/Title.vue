<template>
  <div class="side-title">
    <img class="size-[30px] ml-[40px]" :src="getImageUrl(icon!)" />
    <span class="ml-[10px] mb-[0px]">{{ title }}</span>
  </div>
</template>
<script lang="ts" setup>
import { getImageUrl } from '@/utils/url.ts'
defineProps({ icon: String, title: String })
</script>

<style scoped lang="less">
.side-title {
  background: url('@/assets/images/side-title.png') no-repeat center center;
  background-size: contain;
  width: 400px;
  height: 70px;
  display: flex;
  color: #b4d7fd;
  font-size: 40px;
  align-items: center;
  margin-bottom: 20px;
}
</style>

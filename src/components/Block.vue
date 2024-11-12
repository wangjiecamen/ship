<template>
  <div class="absolute w-[1600px] top-[5px]">
    <div class="flex justify-between items-center text-[#B4D7FD]">
      <div v-for="item in data" :key="item.title" :style="{ color: item.color ? item.color : '' }">
        <div class="bg flex flex-col">
          <div class="text-[35px] flex items-center justify-center mt-[12px]">
            <slot :item="item">
              <div>{{ item.title }}</div>
            </slot>
          </div>
          <div class="flex my-[20px] flex-col flex-1 items-center justify-between">
            <div
              @click="goTo(i.path)"
              :class="item.size === 'small' ? 'text-[25px] ' : 'text-[28px] '"
              class="w-[100%] text-center h-full flex items-center justify-center cursor-pointer hover:bg-[#1D437F]"
              v-for="i in item.links"
              :key="i.name"
            >
              {{ i.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

defineProps<{ data: any }>()
const router = useRouter()
const goTo = (path: string) => {
  console.log(path)
  router.push(path)
}
</script>

<style scoped>
.bg {
  background: url('@/assets/images/bg-1.png') no-repeat center center;
  height: 430px;
  width: 390px;
  background-size: contain;
}
</style>

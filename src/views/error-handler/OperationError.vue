<template>
  <div
    class="flex justify-between text-[#B4D7FD] items-center absolute w-[1600px] top-[10px] px-[250px]"
  >
    <div v-for="item in data" :key="item.title" class="bg flex flex-col">
      <div class="text-[35px] flex items-center justify-center mt-[12px]">
        <div>{{ item.title }}</div>
      </div>
      <div class="flex my-[20px] flex-col flex-1 items-center justify-around">
        <div
          @click="goTo(i.path)"
          class="text-[25px] w-[80%] text-center cursor-pointer hover:bg-[#1D437F]"
          v-for="i in item.links"
          :key="i.name"
        >
          {{ i.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { DetailType } from '@/views/error-handler/constants.ts'
import { useRouter } from 'vue-router'
const router = useRouter()
const data = [
  {
    title: '机械故障',
    links: [
      {
        name: '平台倾斜',
        path: `/error-handler/operation-error/tilt`
      },
      {
        name: '插销无法拔出',
        path: `/error-handler/operation-error/0-28`
      },
      {
        name: '提升油缸无动作',
        path: `/error-handler/operation-error/detail?v=${DetailType.提升油缸无动作}`
      },
      {
        name: '插销油缸无动作',
        path: `/error-handler/operation-error/detail?v=${DetailType.插销油缸无动作}`
      },
      {
        name: '泵站电机无法起动',
        path: `/error-handler/operation-error/detail?v=${DetailType.泵站电机无法起动}`
      },
      {
        name: '插销润滑不充分卡死',
        path: `/error-handler/operation-error/detail?v=${DetailType.插销润滑不充分卡死}`
      }
    ]
  },
  {
    title: '软件故障',
    links: [
      {
        name: '桩腿位移显示错误',
        path: `/error-handler/operation-error/detail?v=${DetailType.桩腿位移显示错误}`
      },
      {
        name: '触摸屏显示与实际监测状态不符',
        path: `/error-handler/operation-error/detail?v=${DetailType.触摸屏显示与实际监测状态不符}`
      },
      {
        name: '电子水平仪与气泡水平仪测量位不符',
        path: `/error-handler/operation-error/detail?v=${DetailType.电子水平仪与气泡水平仪测量位不符}`
      }
    ]
  }
]
const goTo = (path: string) => {
  router.push(path)
}
</script>

<style scoped lang="less">
.bg:first-of-type {
  background: url('@/assets/images/bg-1.png') no-repeat center center;
  height: 430px;
  width: 390px;
  background-size: contain;
}
.bg:nth-of-type(2) {
  background: url('@/assets/images/bg-2.png') no-repeat center center;
  height: 430px;
  width: 600px;
  background-size: contain;
}
</style>

<template>
  <div class="flex items-center flex-col" v-if="showPreloadPhase1">
    <div class="text-[#B4D7FD] text-[36px] mb-[40px] mt-[10px]">判断该位置能否预压载</div>
    <template v-if="showPreloadResultError">
      <div class="text-[30px] text-center">
        <div class="text-[#FF0000]">该位置地基承载能力不足以支撑平台！</div>
        <div class="text-[#A6A6A6] mt-[30px]">是否选择强制执行！</div>
      </div>
      <div class="flex justify-between mt-[20px] w-[650px]">
        <div
          class="button cursor-pointer text-[30px] mt-[30px] text-center"
          @click="goToPreloadPhase2"
        >
          强制执行
        </div>
        <div class="button cursor-pointer text-[30px] mt-[30px] text-center" @click="router.back()">
          退出预压载
        </div>
      </div>
    </template>
    <template v-else-if="showPreloadResultSuccess">
      <div class="text-[30px] text-center text-[#00AA4E]">该位置地基承载能力允许预压载！</div>
      <div
        @click="goToPreloadPhase2"
        class="button cursor-pointer text-[30px] mt-[30px] text-center"
      >
        确认
      </div>
    </template>
    <div v-else class="mx-[500px]">
      <div class="text-[28px] text-[#A6A6A6] flex justify-between">
        请输入平台总垂直载荷Q：<input
          type="number"
          v-model="preloadQuery1.Q"
          class="bg-[#144270] w-[100px] h-[40px] border-none text-[#A6A6A6]"
        />
      </div>
      <div class="text-[28px] text-[#A6A6A6] my-[30px] flex justify-between">
        请输入桩靴与土体接触面积A：<input
          type="number"
          v-model="preloadQuery1.A"
          class="bg-[#144270] w-[100px] h-[40px] border-none text-[#A6A6A6]"
        />
      </div>
      <div class="text-[28px] text-[#A6A6A6] flex justify-between">
        请输入地层强度P：<input
          type="number"
          v-model="preloadQuery1.P"
          class="bg-[#144270] w-[100px] h-[40px] border-none text-[#A6A6A6]"
        />
      </div>
      <div
        @click="confirmPreloadPhase1"
        class="button cursor-pointer relative left-1/2 -translate-x-1/2 text-[30px] mt-[30px] text-center"
      >
        确认
      </div>
    </div>
  </div>
  <div class="flex items-center flex-col" v-else-if="showPreloadPhase2">
    <div class="text-[#B4D7FD] text-[36px] mb-[40px] mt-[10px]">计算预压载时压载水打入量</div>
    <div class="text-[30px] text-[#A6A6A6] text-center" v-if="showPreloadResultSuccess">
      <div class="mb-[20px]">
        压载水共需加<span class="text-[#00AA4E]">{{ U.toFixed(2) }}</span
        >吨，第一次加<span class="text-[#00AA4E]">{{ (U * 0.3).toFixed(2) }}</span
        >吨，第二次加至<span class="text-[#00AA4E]">{{ (U * 0.75).toFixed(2) }}</span
        >吨，第三次加至<span class="text-[#00AA4E]">{{ U.toFixed(2) }}</span
        >吨。
      </div>
      <div>压载水打入量可根据现场实际地质、环境等因素调整。</div>

      <div
        @click="goToPreloadPhase3"
        class="button cursor-pointer relative left-1/2 -translate-x-1/2 text-[30px] mt-[30px] text-center"
      >
        确认
      </div>
    </div>
    <div v-else class="mx-[500px]">
      <div class="text-[28px] text-[#A6A6A6] flex justify-between">
        请输入平台总垂直载荷Q：<input
          type="number"
          v-model="preloadQuery1.Q"
          class="bg-[#144270] w-[100px] h-[40px] border-none text-[#A6A6A6]"
        />
      </div>
      <div class="text-[28px] my-[30px] text-[#A6A6A6] flex justify-between">
        请输入桩腿承受预压载力的系数K：<input
          type="number"
          v-model="preloadQuery1.K"
          class="bg-[#144270] w-[100px] h-[40px] border-none text-[#A6A6A6]"
        />
      </div>
      <div
        @click="confirmPreloadPhase2"
        class="button cursor-pointer relative left-1/2 -translate-x-1/2 text-[30px] mt-[50px] text-center"
      >
        确认
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { DetailType } from './constants'
import { useTitleStore } from '@/store/title.ts'
const useTitle = useTitleStore()
const router = useRouter()
useTitle.setSubTitle('操作指导-预压载')
const preloadQuery1 = reactive({
  Q: '',
  A: '',
  P: '',
  K: ''
})
const showPreloadPhase1 = ref(true)
const showPreloadPhase2 = ref(false)
const showPreloadResultError = ref(false)
const showPreloadResultSuccess = ref(false)

const U = computed(() => (Number(preloadQuery1.K) - 1) * Number(preloadQuery1.Q))
const goToPreloadPhase2 = () => {
  showPreloadResultError.value = false
  showPreloadResultSuccess.value = false
  showPreloadPhase1.value = false
  showPreloadPhase2.value = true
}
const goToPreloadPhase3 = () => {
  showPreloadPhase2.value = false
  showPreloadPhase1.value = false
  router.push(`/operation-guide/detail?v=${DetailType['预压载']}`)
}
const confirmPreloadPhase1 = () => {
  if (Number(preloadQuery1.P) < Number(preloadQuery1.Q) / Number(preloadQuery1.A)) {
    showPreloadResultError.value = true
  } else {
    showPreloadResultSuccess.value = true
  }
}
const confirmPreloadPhase2 = () => {
  showPreloadResultSuccess.value = true
}
</script>

<style scoped lang="scss"></style>

<template>
  <div class="flex items-center flex-col">
    <template v-if="showPhase1">
      <div class="text-[#B4D7FD] text-[36px] mb-[40px] mt-[10px]">判断能否插桩</div>
      <template v-if="showResultError">
        <div class="text-[30px] text-center">
          <div class="text-[#FF0000]">该位置无法实现有效插桩！</div>
          <div class="text-[#A6A6A6] mt-[30px]">是否选择强制执行！</div>
        </div>
        <div class="flex justify-between mt-[20px] w-[650px]">
          <div class="button cursor-pointer text-[30px] mt-[30px] text-center" @click="goToPhase2">
            强制执行
          </div>
          <div
            class="button cursor-pointer text-[30px] mt-[30px] text-center"
            @click="router.back()"
          >
            退出升平台
          </div>
        </div>
      </template>
      <template v-else-if="showResultSuccess">
        <div class="text-[30px] text-center text-[#00AA4E]">该位置地基承载能力允许插桩！</div>
        <div @click="goToPhase2" class="button cursor-pointer text-[30px] mt-[30px] text-center">
          确认
        </div>
      </template>
      <div v-else class="mx-[550px]">
        <div class="text-[28px] text-[#A6A6A6] flex justify-between">
          请输入地层深度H：<input
            type="number"
            v-model="riseQuery.H"
            class="bg-[#144270] w-[150px] h-[40px] border-none text-[#A6A6A6]"
          />
        </div>
        <div class="text-[28px] text-[#A6A6A6] my-[30px] flex justify-between">
          请输入平台正常作业水深h：<input
            type="number"
            v-model="riseQuery.h"
            class="bg-[#144270] w-[150px] h-[40px] border-none text-[#A6A6A6]"
          />
        </div>

        <div
          @click="confirmPhase1"
          class="button cursor-pointer relative left-1/2 -translate-x-1/2 text-[30px] mt-[50px] text-center"
        >
          确认
        </div>
      </div>
    </template>
    <div v-if="showPhase2" class="flex items-center flex-col">
      <div class="text-[#B4D7FD] text-[36px] mb-[40px] mt-[10px]">计算桩腿入泥标准值</div>
      <div class="text-[30px] text-center" v-if="showResultSuccess">
        <div class="mb-[20px] text-[#A6A6A6]">
          桩腿入泥深度标准值为<span class="text-[#00AA4E]">{{
            (Number(riseQuery.Q) / (Number(riseQuery.A) * Number(riseQuery.qu))).toFixed(2)
          }}</span>
        </div>
        <div
          @click="goToPhase3"
          class="button cursor-pointer relative left-1/2 -translate-x-1/2 text-[30px] mt-[30px] text-center"
        >
          确认
        </div>
      </div>
      <div v-else class="mx-[500px]">
        <div class="text-[28px] text-[#A6A6A6] flex justify-between">
          请输入平台总垂直载荷Q：<input
            type="number"
            v-model="riseQuery.Q"
            class="bg-[#144270] w-[150px] h-[40px] border-none text-[#A6A6A6]"
          />
        </div>
        <div class="text-[28px] my-[30px] text-[#A6A6A6] flex justify-between">
          请输入桩靴与土体接触面积A：<input
            type="number"
            v-model="riseQuery.A"
            class="bg-[#144270] w-[150px] h-[40px] border-none text-[#A6A6A6]"
          />
        </div>
        <div class="text-[28px] my-[30px] text-[#A6A6A6] flex justify-between">
          请输入土壤极限承载力qu：<input
            type="number"
            v-model="riseQuery.qu"
            class="bg-[#144270] w-[150px] h-[40px] border-none text-[#A6A6A6]"
          />
        </div>
        <div
          @click="confirmPhase2"
          class="button cursor-pointer relative left-1/2 -translate-x-1/2 text-[30px] mt-[50px] text-center"
        >
          确认
        </div>
      </div>
    </div>
    <div v-if="showPhase3" class="text-[#A6A6A6] text-[36px] text-center">
      <div class="mt-[50px]">升平台操作可选择自动操作和手动操作</div>
      <div class="my-[30px]">
        当升平台操作是准备<span class="text-white">插桩</span>，则必须选择<span class="text-white"
          >手动</span
        >操作
      </div>
      <div>
        当升平台操作是准备<span class="text-white">作业</span>，则既可选择<span class="text-white"
          >手动</span
        >操作，也可以选择<span class="text-white">自动</span>操作。
      </div>
      <div class="flex justify-between mx-[200px] text-[30px] text-black mt-[50px]">
        <div @click="goToManual" class="button cursor-pointer text-center">手动操作</div>
        <div @click="goToAuto" class="button cursor-pointer text-center">自动操作</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTitleStore } from '@/store/title.ts'
import { DetailType } from './constants.ts'
const showPhase1 = ref(true)
const showPhase2 = ref(false)
const showResultError = ref(false)
const showResultSuccess = ref(false)
const showPhase3 = ref(false)
const useTitle = useTitleStore()
useTitle.setSubTitle('操作指导-升平台')
const router = useRouter()
const riseQuery = reactive({
  H: '',
  h: '',
  Q: '',
  A: '',
  qu: ''
})
const goToManual = () => {
  router.push(`/operation-guide/detail?v=${DetailType['手动升平台']}`)
}
const goToAuto = () => {
  router.push(`/operation-guide/detail?v=${DetailType['自动升平台']}`)
}
const goToPhase2 = () => {
  showPhase1.value = false
  showPhase2.value = true
  showResultSuccess.value = false
  showResultError.value = false
}
const confirmPhase1 = () => {
  if (Number(riseQuery.H) > Number(riseQuery.h) * 2) {
    showResultError.value = true
    showResultSuccess.value = false
  } else {
    showResultError.value = false
    showResultSuccess.value = true
  }
}
const confirmPhase2 = () => {
  showResultSuccess.value = true
}
const goToPhase3 = () => {
  showPhase2.value = false
  showPhase3.value = true
}
</script>

<style scoped>
.button {
  background: url('@/assets/images/button.png') no-repeat center center;
  background-size: contain;
  width: 200px;
  height: 80px;
  line-height: 80px;
}
</style>

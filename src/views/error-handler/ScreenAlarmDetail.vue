<template>
  <div :style="{ color: color }" class="text-[28px]" v-for="(item, index) in types" :key="index">
    <label class="cursor-pointer flex items-center mb-[20px]">
      <input
        v-model="item.checked"
        type="checkbox"
        class="size-[30px] flex-shrink-0 mr-[10px]"
        :style="{ accentColor: color }"
      />
      <div :style="{ opacity: item.checked ? 0.5 : 1 }">{{ item.content }}</div>
      <a
        class="ml-[20px] text-white underline underline-offset-[8px]"
        v-if="item.button"
        @click="item.button.link"
      >
        {{ item.button.name }} >
      </a>
    </label>
  </div>
</template>
<script lang="ts" setup>
import { DetailType } from './constants.ts'
import { useRoute } from 'vue-router'
import { useTitleStore } from '@/store/title.ts'
import { ref } from 'vue'
const route = useRoute()
const useTitle = useTitleStore()
const v = route.query.v as keyof typeof DetailType
const type = route.query.type
useTitle.setSubTitle(('触摸屏报警-' + DetailType[v]) as unknown as string)

const color = type === '1' ? '#FAFB00' : type === '2' ? '#FE6200' : '#F90000'

const valueMap = {
  [DetailType.倾斜传感器故障]: [
    { checked: false, content: '检查倾斜传感器的接线' },
    { checked: false, content: '更换倾斜传感器' }
  ],
  [DetailType.集控台主电源失效]: [
    {
      checked: false,
      content: '配电板是否提供电源是否正确'
    },
    {
      checked: false,
      content: '集控台内Q1断路器是否合上'
    },
    {
      checked: false,
      content: '开关电源G1是否正常'
    }
  ],
  [DetailType.平台倾斜超限报警]: [
    { checked: false, content: '检查平台的倾斜状态，调整平台水平状态至正常范围' }
  ],
  [DetailType.桩腿工况选择错误]: [{ checked: false, content: '根据当前实际工况进行选择' }],
  [DetailType.桩腿液压高油温报警]: [
    { checked: false, content: '检查泵站冷却水系统是否正常' },
    { checked: false, content: '温度传感器是否正常' }
  ],
  [DetailType.桩腿泵站油箱低液位]: [
    { checked: false, content: '油箱液位计油位是否正常，若液位低则增加液压油' },
    { checked: false, content: '液位开关接线是否松动' },
    { checked: false, content: '系统是否存在漏油现象,若存在则需要对漏油处进行处理' }
  ],
  [DetailType.桩腿泵站油箱高液位]: [
    { checked: false, content: '油箱液位计油位是否正常，若液位高则适当放油' },
    { checked: false, content: '液位开关接线是否松动' },
    {
      checked: false,
      content: '检查油缸位移是否存在较大变化(缩短)，若存在则需要对油缸或者阀组进行排查'
    }
  ],
  [DetailType.桩腿泵站回油滤器FS堵塞]: [
    { checked: false, content: '拆开滤器滤芯进行清洗，复装后报警是否消除' },
    { checked: false, content: '滤器压差开关接线是否松动' },
    { checked: false, content: '若报警仍未消除，则需要更换滤芯' },
    { checked: false, content: '若报警仍未消除,则需更换压差发讯器' }
  ],
  [DetailType.桩腿保压油缸滑移]: [
    { checked: false, content: '检查油缸是否存在泄漏' },
    { checked: false, content: '管路是否存在泄漏' }
  ],
  [DetailType.插销插入失败]: [
    { checked: false, content: '插销是否正常插入' },
    { checked: false, content: '若已插入但报警，则检查接近开关' },
    { checked: false, content: '若未插入，则调整支持插销的位置后重新执行插入动作' }
  ],
  [DetailType.插销拔出失败]: [
    { checked: false, content: '插销是否正常拔出' },
    { checked: false, content: '若已拔出但报警，则检查接近开关' },
    { checked: false, content: '若未拔出，则调整支持插销的位置后重新拔出' }
  ],
  [DetailType.某个桩腿负荷超限]: [
    { checked: false, content: '平台是否倾斜,造成桩腿负荷过大' },
    { checked: false, content: '液压管路是否正常' }
  ],
  [DetailType.桩腿液压高油温停机]: [
    { checked: false, content: '检查泵站冷却水系统是否正常工作' },
    { checked: false, content: '温度传感器是否正常' },
    { checked: false, content: '若以上均正常，则需要启动电机让系统进入循环冷却' }
  ],
  [DetailType.某个桩腿上限位]: [{ checked: false, content: '执行桩腿上升或平台下降操作' }],
  [DetailType.某个桩腿下限位]: [{ checked: false, content: '执行桩腿下降或平台上升操作' }],
  [DetailType.平台倾斜超限停机]: [
    {
      checked: false,
      content: '检查平台的倾斜状态，调整平台水平状态至正常范围',
      button: { name: '平台调平', link: '' }
    }
  ],
  [DetailType.紧急停机]: [
    { checked: false, content: '检查集控台及各机旁控制箱的急停按钮，复位按下的急停按钮' }
  ],
  [DetailType.桩腿PU电机断相]: [
    { checked: false, content: '起动器主电源是否断相' },
    { checked: false, content: '起动器主电源外部电缆接线是否存在松脱' },
    { checked: false, content: '起动器内微型断路器是否合上' },
    { checked: false, content: '起动器内断相继电器是否故障' }
  ],
  [DetailType.桩腿PU电机过载]: [
    { checked: false, content: '热维电器设定值是否正确' },
    { checked: false, content: '热继电器测试按钮是否被按下' },
    { checked: false, content: '热继电器是否故障' }
  ]
}
const types = ref(valueMap[v])
</script>

<style scoped lang="scss"></style>

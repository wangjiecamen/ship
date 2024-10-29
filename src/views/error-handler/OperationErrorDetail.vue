<template>
  <div class="text-[28px]" v-for="(item, index) in types" :key="index">
    <label class="cursor-pointer flex items-start text-white mb-[20px]">
      <input v-model="item.checked" type="checkbox" class="size-[30px] flex-shrink-0 mr-[10px]" />
      <div :style="{ opacity: item.checked ? 0.5 : 1 }" v-html="item.content"></div>
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
import { useRoute } from 'vue-router'
import { useTitleStore } from '@/store/title.ts'
import { DetailType } from '@/views/error-handler/constants.ts'
import { ref } from 'vue'

const route = useRoute()
const useTitle = useTitleStore()
const v = route.query.v as keyof typeof DetailType
useTitle.setSubTitle(('操作故障-' + DetailType[v].replace(/\d+/g, '')) as unknown as string)
const valueMap = {
  [DetailType.提升油缸无动作]: [
    {
      checked: false,
      content:
        '检查液压泵站出口球阀、上下环梁控制阀组出口球阀、插销控制阀组出口球阀和油缸阀组上的球阀是否打开'
    },
    {
      checked: false,
      content:
        '在手动模式下控制提升油缸的伸缩(环梁工况)，启动1#电机，查看加载阀DT1.1/DT1.2 和控制提升油缸动作的电磁阀DT7/DT8或DT14/DT15 是否正常得电'
    },
    {
      checked: false,
      content: '在提升油缸动作时，查看有杆腔或无杆腔的压力是否正常'
    },
    {
      checked: false,
      content: '若上述两项均正常，则检查液压回路'
    },

    {
      checked: false,
      content: '待上述检查充毕后，提升油缸能按操作指令正常伸缩则此故障解除。'
    }
  ],
  [DetailType.插销油缸无动作]: [
    {
      checked: false,
      content: '检查液压泵站出口球阀和插销控制阀组出口球阀是否打开'
    },
    {
      checked: false,
      content:
        '在手动模式下控制插销油缸的插拔，查看加载阀 DT1.3 和控制插销油缸动作的电磁阀DT3 或DT5 是否正常得电。'
    },
    {
      checked: false,
      content: '在插销油缸动作时，查看油缸有无正常动作，是否有卡阻现象'
    },
    {
      checked: false,
      content: '若上述两项均正常，则检查液压回路'
    },
    {
      checked: false,
      content: '待上述检查充毕后，插销油缸能按操作指令正常伸缩则此故障解除'
    }
  ],
  [DetailType.泵站电机无法起动]: [
    {
      checked: false,
      content: '查看触摸屛是否有报警，若有，则参照上面“报警处理”先排除故障'
    },
    {
      checked: false,
      content:
        '查看控制权限，若控制权限在机旁、只能在起动都控制泵站的起停，若控制权限在远程，则只能在集中控制台操作泵站'
    },
    {
      checked: false,
      content: '查看主回路断路器是否正常合上'
    },
    {
      checked: false,
      content: '查看主回路电源，确保主回路电源准确'
    },
    {
      checked: false,
      content: '若无上述问题，则要对照电气原理图依顺序查找线路是否有松脱现象'
    },
    {
      checked: false,
      content: '待上述检查完毕后，复位故障，重新启动泵站，若泵站能正常启动,则此故障解除'
    }
  ],
  [DetailType.插销润滑不充分卡死]: [
    {
      checked: false,
      content: '检查润滑油的水平和质量。若润滑油不足或质量不佳，及时补充或更换润滑油'
    },
    {
      checked: false,
      content: '清洁润滑系统内的残留物和污染物，确保润滑油的流动畅通'
    },
    {
      checked: false,
      content:
        '检查润滑管路和润滑点，清除可能的堵塞物或异物，定期清洁润滑系统，以防止油路堵塞和润滑不充分'
    }
  ],
  [DetailType.桩腿位移显示错误]: [
    {
      checked: false,
      content:
        '判断位移传感器部分是否能正常工作：单动提升油缸，检查触摸屏位移值是否正常变化。若位移传感器存在异常，则检查: <br> ' +
        'A、通讯是否正常； <br> ' +
        'B、 PLC的采集模块是否正常 ； <br> ' +
        'C、从位移传感器到采集模块的线路是否有松脱现象'
    },
    {
      checked: false,
      content: '单动插销，检查限位开关是否正常工作'
    }
  ],
  [DetailType.触摸屏显示与实际监测状态不符]: [
    {
      checked: false,
      content: '查看集控台的显示屏上观察是否有报警信息'
    },
    {
      checked: false,
      content: '对照触摸开中无法正常显示的部分查看相应检测元件和采集模块是否正常工作'
    },
    {
      checked: false,
      content: '检查检测元件到采集模块的线路，查看是否有松脱现象'
    },
    {
      checked: false,
      content: '待上述检查完毕后，重新起动触摸屏，能正常监控平台状态则此故障解除'
    }
  ],
  [DetailType.电子水平仪与气泡水平仪测量位不符]: [
    {
      checked: false,
      content: '检查电子水平仪接线有无松脱现象'
    },
    {
      checked: false,
      content: '检查电子水平仪安装处是否有人为破坏变形，导致基准面不符'
    }
  ],
  [DetailType.插销无法拔出1]: [
    {
      checked: false,
      content:
        '先逐一排除以下故障可能：\n' +
        '桩腿倾斜、平台倾斜、销孔内有异物或海生物、插销油缸打开导致控制油压过低、环梁导向与腿间隙过大使环梁倾斜、上插销与下插销间隙过大导致插销因异物磨损严重\n' +
        '若不存在上述情况，考虑是由于插销机械动作时间长于电气动作时间，此时只需重新拔出即可将插销拔出脱开'
    },
    {
      checked: false,
      content: '如果环梁上的四只插销，仅部分插销拔出，此时应将插销重新插入插销孔内，重复拔出插销'
    }
  ],
  [DetailType.插销无法拔出2]: [
    {
      checked: false,
      content: `安排人员先到机旁进行检查`
    },
    {
      checked: false,
      content: '首先排除是否为接近开关故障'
    },
    {
      checked: false,
      content: '观察插销和插销孔的相对位置，再进行提升油缸和插销油缸的动作'
    }
  ]
}
const types = ref(valueMap[v])
</script>

<style scoped lang="scss"></style>

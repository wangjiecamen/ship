<template>
  <div class="text-[28px]" v-for="(item, index) in types" :key="index">
    <div class="flex text-white mb-[20px]">
      <input v-model="item.checked" type="checkbox" class="size-[30px] flex-shrink-0 mr-[10px]" />
      <div
        class="flex flex-wrap"
        :style="{ opacity: item.checked ? 0.5 : 1 }"
        v-html="item.content"
      ></div>
    </div>
    <template v-if="item.children">
      <div v-for="i in item.children">
        <label class="cursor-pointer ml-[10px] flex text-white text-[25px] mb-[20px]">
          <input v-model="i.checked" type="checkbox" class="size-[25px] flex-shrink-0 mr-[10px]" />
          <div
            class="flex flex-wrap"
            :style="{ opacity: i.checked ? 0.5 : 1 }"
            v-html="i.content"
          ></div>
        </label>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { useTitleStore } from '@/store/title.ts'
import { DetailType } from '@/views/operation-guide/constants.ts'
import { ref } from 'vue'
import { getImageUrl } from '@/utils/url.ts'

const route = useRoute()

const useTitle = useTitleStore()
const v = route.query.v as keyof typeof DetailType

useTitle.setSubTitle(('操作指导-' + DetailType[v]) as unknown as string)

const valueMap = {
  [DetailType.插销失效]: [
    {
      checked: false,
      content: '现场确认是否为单个插销失效'
    },
    {
      checked: false,
      content: '若需继续进行升降操作，在集中控制台进行“忽略报警”操作'
    },
    {
      checked: false,
      content: '进行升降提升油缸操作、插拔插销操作，使平台处于正常安全状态'
    },
    {
      checked: false,
      content: '确认平台处于安全状态后，停止升降操作，检查报警故障并进行维修'
    }
  ],
  [DetailType.有杆腔液压管路爆管]: [
    {
      checked: false,
      content: '现场确认是否为提升油缸有杆腔液压管路失效'
    },
    {
      checked: false,
      content: '若需继续进行升降操作，在集中控制台进行“忽略报警”操作'
    },
    {
      checked: false,
      content:
        '关闭非正常状态的提升油缸有杆腔进油口的球阀，将平台负载转移到另一个环梁上，将该油缸所在环梁缩至短行程（即油缸行程为30mm左右），关闭该环梁上所有油缸有杆腔的球阀，此时该环梁转变为定环梁，升降系统从连续型升降变为步进式升降'
    },
    {
      checked: false,
      content: '操作单个环梁进行提升油缸升降、插拔插拔销操作'
    },
    {
      checked: false,
      content: '确认平台处于安全状态时，停止应急升降操作，检查报警故障并进行维修'
    },
    {
      checked: false,
      content: '注意：本系统一次最多承受一个油缸/插销失效，出现单个油缸/插销失效时必须立刻处理'
    }
  ],
  [DetailType.无杆腔液压管路爆管]: [
    {
      checked: false,
      content: '现场确认是否为单个提升油缸无杆腔液压管路失效'
    },
    {
      checked: false,
      content: '若需继续进行升降操作，在集中控制台进行“忽略报警”操作'
    },
    {
      checked: false,
      content:
        '关闭非正常状态的提升油缸无杆腔进油口的球阀，将平台负载转移到另一个环梁上，将该油缸所在环梁缩至短行程（油缸行程为30mm左右），并关闭该环梁上所有油缸无杆腔的球阀，将该环梁转变为定环梁，升降系统从连续型升降变为步进式升降'
    },
    {
      checked: false,
      content: '根据应急升降要求，采用步进式升降原理，操作单个环梁进行提升油缸升降、插拔插拔销操作'
    },
    {
      checked: false,
      content: '确认平台处于安全状态时，停止应急升降操作，检查报警故障并进行维修'
    },
    {
      checked: false,
      content: '注意：本系统一次最多承受一个油缸/插销失效，出现单个油缸/插销失效时必须立刻处理'
    }
  ],
  [DetailType.集中控制台失效]: [
    {
      checked: false,
      content: '在集中控制台上将控制权限切换至机旁控制箱操作，或打开机旁控制箱内的应急开关'
    },
    {
      checked: false,
      content: '在机旁控制箱进行相应升降提升油缸操作、插拔插销操作'
    },
    {
      checked: false,
      content: '确认平台处于安全状态后，停止升降操作，检查报警故障并进行维修'
    }
  ],
  [DetailType.桩腿CPU故障]: [
    {
      checked: false,
      content: `<div class="flex items-start">在机旁控制箱将“关-应急控制-开”的钥匙开关打开，接下来操作均在机旁控制箱进行<img class="invert w-[220px] h-[150px]" src="${getImageUrl('cpu_error.png')}"/></div>`
    },
    {
      checked: false,
      content:
        '选择需要动作的环梁（如X环梁），由于机旁只能进行单环梁操作，因此上环梁或者下环梁都可以选择'
    },
    {
      checked: false,
      content: `<div>判断平台位置，并选择背压档位：</div>
<div>
            <div>A.若平台在水面以上:</div>
            <div class="ml-[20px]">a.若需降平台，选择背压的0档：此时，X环梁的插销承受平台负载，且环梁上升</div>
            <div  class="ml-[20px]">b.若需升平台，选择背压的3档：此时，X环梁的插销承受平台负载或所选环梁的插销在插销孔外，且环梁下降</div>
            <div>B.若平台在水面漂浮：</div>
             <div  class="ml-[20px]">a.若需升桩腿，选择背压的1档：此时，X环梁上升</div>
             <div  class="ml-[20px]">b.若需降桩腿，选择背压的2档：此时，X环梁的插销承受桩腿负载，且环梁下降</div>
</div>
`
    },
    {
      checked: false,
      content: '注意：桩腿CPU故障的应急操作与机旁手动操作的区别是需要人为选择背压，且没有安全保护'
    }
  ],
  [DetailType.预压载]: [
    {
      checked: false,
      content: `确定集中控制台的“关-控制系统-开”钥匙开关打到“开”，<img class="invert w-[198px] h-[130px]" src="${getImageUrl('yjz1.png')}"/>泵站电机已起动`
    },
    {
      checked: false,
      content: `确定集中控制台的“集中控制-机旁控制”控制位置选择开关打到“集中控制 <img class="invert w-[150px] h-[150px]" src="${getImageUrl('yjz2.png')}"/>`
    },
    {
      checked: false,
      content: `确定集中控制台的“降桩-升桩-降平台-升平台-预压载-拔桩”工况选择开关打到5，表明为预压载工况<img class="invert w-[200px] h-[140px]" src="${getImageUrl('yjz3.svg')}"/>`
    },
    {
      checked: false,
      content: `确定集中控制台的“自动-手动”控制模式选择开关打到“手动”<img class="invert w-[150px] h-[150px]" src="${getImageUrl('yjz4.svg')}"/>`
    },
    {
      checked: false,
      children: [
        {
          checked: false,
          content: `<div>将未插入的插销所对应的对角线桩腿转至“升平台”或“降平台”工况</div>`
        },
        {
          checked: false,
          content: `<div>在触摸屏上选择“上环梁”</div>  `
        },
        {
          checked: false,
          content: `
            <div>在集中控制台将手柄打至“上插销拔出+环梁上升”</div>
             <img class="invert w-[400px] h-[250px]" src="${getImageUrl('yjz6.png')}"/>
           `
        },
        {
          checked: false,
          content: `
            <div>待上插销插入插销孔后，手柄回中。</div>`
        }
      ],
      content: `确定两组对角线桩腿（1#和4#、2#和3#）的提升油缸的插销全部在插销孔内
    <div>
         <div>
           <img class=" h-[400px] w-[200px] ml-[200px] mt-[20px]"  src="${getImageUrl('yjz5.svg')}"/></div>
            <div>若有一组提升油缸的插销不在插销孔内，则执行以下操作：</div>
        </div>
    </div>
`
    },
    {
      checked: false,
      content: `1.将一组对角线桩腿的控制手柄打到环梁下降位置
                <img class="invert w-[300px] h-[250px]" src="${getImageUrl('yjz7.svg')}"/>或
                <img class="invert w-[300px] h-[250px]" src="${getImageUrl('yjz8.svg')}"/>`
    },
    {
      checked: false,
      content: `2.当每条桩腿的负荷都达到第一阶段的预压载荷，两组对角桩腿循环压桩2~3次，每次压5分钟`
    },
    {
      checked: false,
      content: `3.该预压阶段结束后，停留15分钟。若期间平台状态正常，再进行下一阶段`
    },
    {
      checked: false,
      content: `重复步骤1~3，依次执行预压载的三个阶段`
    },
    {
      checked: false,
      content: `确保所有桩腿的桩腿载荷达到预压载荷，预压载结束，将平台调平`
    },
    {
      checked: false,
      content: `预压完毕后，平台需升离海面0.5m高，以减少平台受波浪的横向力的影响，并便于预压出现故障时平台能快速降至水中应对风险`
    }
  ],
  [DetailType.拔桩]: [
    {
      checked: false,
      content: `确定集中控制台的“关-控制系统-开”钥匙开关打到“开”，泵站电机已起动<img class="invert w-[200px] h-[150px]" src="${getImageUrl('bz1.svg')}"/>`
    },
    {
      checked: false,
      content: `确定集中控制台的“集中控制-机旁控制”控制位置选择开关打到“集中控制”<img class="invert w-[200px] h-[150px]" src="${getImageUrl('bz2.svg')}"/>`
    },
    {
      checked: false,
      content: `确定集中控制台的“降桩-升桩-降平台-升平台-预压载-拔桩”工况选择开关打到6，表明为拔桩工况<img class="invert w-[200px] h-[150px]" src="${getImageUrl('bz3.svg')}"/>`
    },
    {
      checked: false,
      content: `确定集中控制台的“自动-手动”控制模式选择开关打到“手动”<img class="invert w-[200px] h-[150px]" src="${getImageUrl('bz4.svg')}"/>`
    },
    {
      children: [
        {
          checked: false,
          content: `将未插入的插销所对应的对角线桩腿转至“升桩腿”或“降桩腿”工况`
        },
        {
          checked: false,
          content: `在触摸屏上选择“上环梁”`
        },
        {
          checked: false,
          content: `在集中控制台将手柄打至“上插销拔出+环梁下降”<img class="invert w-[300px] h-[200px]" src="${getImageUrl('bz6.svg')}"/>`
        },
        {
          checked: false,
          content: `待上插销插入插销孔后，手柄回中。`
        }
      ],
      checked: false,
      content: `确定两组对角线桩腿（1#和4#、2#和3#）的提升油缸的插销全部在插销孔内
 <div>
         <div>
           <img class="w-[300px] h-[400px] ml-[200px] mt-[20px]"  src="${getImageUrl('bz5.svg')}"/></div>
            <div>若有一组提升油缸的插销不在插销孔内，则执行以下操作：</div>

</div>
</div>

      `
    },
    {
      checked: false,
      content: `确保控制手柄打到环梁上升位置
<img class="invert w-[300px] h-[200px]" src="${getImageUrl('bz7.svg')}"/>或
<img class="invert w-[300px] h-[200px]" src="${getImageUrl('bz8.svg')}"/>
`
    },
    {
      checked: false,
      content: `选对角桩腿进行间隙交替拔桩，第一次拔桩载荷为额定拔桩力的50% （本平台为3000吨），第二次拔桩载荷为额定拔桩力的75% （本平台为4500吨），第三次拔桩载荷为额定拔桩力的100% （本平台为6000吨）`
    },
    {
      checked: false,
      content: `当某条桩腿的载荷从额定的拔桩力值变化到桩腿自重吨，说明该桩腿已出泥`
    }
  ],
  [DetailType.手动升平台]: [
    {
      checked: false,
      content: `确定集中控制台的“关-控制系统-开”钥匙开关打到“开”,泵站电机已起动<img class="invert w-[220px] h-[150px]" src="${getImageUrl('spt1.svg')}"/>`
    },
    {
      checked: false,
      content: `确保所有上、下插销处于插入状态；上提升油缸处于短行程，下提升油缸处于长行程。<img class="w-[500px] my-[10px] h-[300px]" src="${getImageUrl('spt2.svg')}"/>`
    },
    {
      checked: false,
      content: `确定集中控制台的“集中控制-机旁控制”控制位置选择开关打到“集中控制”。<img class="invert  w-[200px] h-[150px]" src="${getImageUrl('spt3.svg')}"/>`
    },
    {
      checked: false,
      content: `确定集中控制台的“降桩-升桩-降平台-升平台-预压载-拔桩”工况选择开关打到4，表明为升平台工况<img class="invert w-[300px] h-[180px]" src="${getImageUrl('spt4.svg')}"/>`
    },
    {
      checked: false,
      content: `确定集中控制台的“自动-手动”控制模式选择开关打到“手动”<img class="invert size-[180px]" src="${getImageUrl('spt5.svg')}"/>`
    },
    {
      checked: false,
      content: `1.将桩腿的控制手柄打到“上插销拔出+环梁下降”位置<img class="invert w-[305px] h-[179px]" src="${getImageUrl('spt6.svg')}"/>待上插销全部拔出插销孔，下环梁油缸缩回，上环梁油缸伸出，直到上插销再次插入插销孔,控制手柄回中
<div class="flex items-center my-[10px]">
    <img class="w-[230px] h-[400px]" src="${getImageUrl('spt7.svg')}">
    <img class="mx-[20px] w-[60px] h-[40px]" src="${getImageUrl('convert.png')}"/>
    <img class="w-[230px] h-[400px]" src="${getImageUrl('spt8.svg')}">
</div>


`
    },
    {
      checked: false,
      content: `2.将手柄打到“下插销拔出+环梁上升”位置<img class="invert w-[293px h-[180px]]" src="${getImageUrl('spt9.svg')}"/>
   待下插销全部拔出插销孔，下环梁油缸伸出，上环梁油缸缩回，直到下插销再次插入插销孔后，
    <div class="flex items-center my-[10px]">
    <img class="w-[230px] h-[400px]" src="${getImageUrl('spt10.svg')}">
    <img class="mx-[20px] w-[60px] h-[40px]" src="${getImageUrl('convert.png')}"/>
    <img class="w-[230px] h-[400px]" src="${getImageUrl('spt11.svg')}">
</div>
`
    },
    { checked: false, content: '重复步骤1、2，直到平台达到作业高度' }
  ],
  [DetailType.自动升平台]: [
    {
      checked: false,
      content: `确定集中控制台的“关-控制系统-开”钥匙开关打到“开”,泵站电机已起动<img class="invert w-[220px] h-[150px]" src="${getImageUrl('zdspt1.png')}">`
    },
    {
      checked: false,
      content: `确定集中控制台的“集中控制-机旁控制”控制位置选择开关打到“集中控制”<img class="invert w-[200px] h-[150px]" src="${getImageUrl('zdspt2.svg')}">`
    },
    {
      checked: false,
      content: `确定集中控制台的“降桩-升桩-降平台-升平台-预压载-拔桩”工况选择开关打到4，表明为升平台工况<img class="invert w-[260px] h-[180px]" src="${getImageUrl('zdspt3.svg')}">`
    },
    {
      checked: false,
      content: `确定集中控制台的“自动-手动”控制模式选择开关打到“自动”<img class="invert w-[200px] h-[150px]" src="${getImageUrl('zdspt4.svg')}">`
    },
    {
      checked: false,
      content: `在集中控制台的触摸屏主页上设置自动升降的节距数<img class="invert w-[200px] h-[150px]" src="${getImageUrl('zdspt5.svg')}">`
    },
    {
      checked: false,
      content: `若联动：确定已按下需要进行降桩操作桩腿的“就绪”带灯按钮，待“就绪”带灯按钮常亮后，按下相应的“起动”带灯按钮，该带灯按钮常亮后，表明开始“升平台”
      <div>若单动：“1#、2#、3#、4#”桩腿，选择几个需要控制的桩腿的“就绪”带灯按钮，待“就绪”带灯按钮常亮后，按下相应的“起动”带灯按钮，该带灯按钮常亮后，表明某几个桩腿开始“升平台”（一般用于调平）</div>
      `
    }
  ]
}
const types = ref(valueMap[v])
</script>

<style scoped></style>

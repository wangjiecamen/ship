<template>
  <div class="text-[28px]" v-for="(item, index) in types" :key="index">
    <div class="flex text-white mb-[20px]">
      <input v-model="item.checked" type="checkbox" class="size-[30px] flex-shrink-0 mr-[10px]" />
      <div :style="{ opacity: item.checked ? 0.5 : 1 }" v-html="item.content"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useTitleStore } from '@/store/title.ts'
import { DetailType } from '@/views/attention/constants.ts'
import { ref, onMounted } from 'vue'

const route = useRoute()
const useTitle = useTitleStore()
const v = route.query.v as keyof typeof DetailType

useTitle.setSubTitle(('注意事项-' + DetailType[v]) as unknown as string)
onMounted(() => {
  const button = document.querySelector('.button')!
  const inputl1 = document.querySelector('#l1') as HTMLInputElement
  const inputm1 = document.querySelector('#m1') as HTMLInputElement
  const inputm2 = document.querySelector('#m2') as HTMLInputElement
  const inputl2 = document.querySelector('#l2') as HTMLInputElement
  const inputw = document.querySelector('#w') as HTMLInputElement

  button.addEventListener('click', () => {
    console.log(inputl1.value, inputm1.value, inputm2.value, inputl2.value, inputw.value)
    //inputm1.value:横摇角度θ1
    //inputm2.value:横摇角度θ2
    //inputl1.value:水深
    //inputl2.value:桩靴长度
    //inputw.value:桩靴宽度
    console.log(radiansToDegrees(Math.atan(inputl2.value / (2 * inputl1.value))) - inputm2.value)
    console.log(
      ((radiansToDegrees(
        Math.cos(
          ((radiansToDegrees(Math.atan(inputl2.value / (2 * inputl1.value))) - inputm2.value) *
            Math.PI) /
            180
        )
      ) *
        Math.PI) /
        180) *
        Math.sqrt(inputl1.value ** 2 + (inputl2.value / 2) ** 2) -
        inputl1.value
    )
    const result = (
      ((radiansToDegrees(
        Math.cos(
          ((radiansToDegrees(Math.atan(inputl2.value / (2 * inputl1.value))) - inputm2.value) *
            Math.PI) /
            180
        )
      ) *
        Math.PI) /
        180) *
        Math.sqrt(inputl1.value ** 2 + (inputl2.value / 2) ** 2) -
      inputl1.value +
      ((radiansToDegrees(
        Math.cos(
          ((radiansToDegrees(Math.atan(inputw.value / (2 * inputl1.value))) - inputm1.value) *
            Math.PI) /
            180
        )
      ) *
        Math.PI) /
        180) *
        Math.sqrt(inputl1.value ** 2 + (inputw.value / 2) ** 2) -
      inputl1.value +
      1
    ).toFixed(2)

    const resultDom = document.querySelector('#result')!
    resultDom.innerHTML = `安全缓冲距离H为${result}m`
  })
})
function radiansToDegrees(radians: number) {
  return radians * (180 / Math.PI)
}
const valueMap = {
  [DetailType.通用注意事项]: [
    {
      checked: false,
      content:
        '禁止在桩腿动作过程中切换“工况”、“控制权限”和“工作模式”等状态，只能在动作停止时切换，并要确保当前状态与要执行的工况一致，否则系统报警提示'
    },
    {
      checked: false,
      content: `系统内置3种动作连锁：</br>
                a.只有当一组环梁的插销油缸在插销孔内时，系统才允许拔另外一组环梁的插销</br>
                b.联动桩腿时，当任意一条桩腿因故障而停止升降动作时，其它桩腿都会停止升降动作，且插销保持为插入状态</br>
                c.手动控制时，即使手柄处在“插销拔出”状态，但当插销接近插销孔时，插销会自动插入，从而确保插销贴着桩腿外壁滑入桩腿孔</br>
`
    },
    {
      checked: false,
      content: '操作时，各桩腿独立运动，并非联动'
    }
  ],
  [DetailType.自动操作注意事项]: [
    {
      checked: false,
      content:
        '自动操作过程中，操作人员右手需始终放在“自动控制停止”按钮上方。当发生压力显示异常、倾斜过度或状态指示混乱等情况，需立即按下“自动控制停止"按钮，将操作权限切回集控台手动或机旁控制，在排除异常后才可以再切回自动操作'
    }
  ],
  [DetailType.手动操作注意事项]: [
    {
      checked: false,
      content: '手动操作一般用于检修和调整环梁状态'
    },
    {
      checked: false,
      content: '手动操作由手柄控制，每根手柄控制一条桩腿，各桩腿升降装置的动作均为分步动作'
    },
    {
      checked: false,
      content:
        '上下插销的选择由手柄控制，手柄往左边为上插销，往右边为下插销，而上下环梁的选择由集控台触摸屏上各桩腿界面的上下环梁选择按钮控制'
    },
    {
      checked: false,
      content: '一次只能一组环梁动作'
    },
    {
      checked: false,
      content:
        '升桩、降桩、升平台、降平台四种工况手动选择环梁时只有“上环梁”、“下环梁”两种选择(默认为下环梁)；拔桩和预压载两种工况有“双环梁”、“上环梁”、“下环梁”三种选择(默认为双环梁)'
    }
  ],
  [DetailType.自动降桩]: [
    {
      checked: false,
      content:
        '降桩前应精确测量平台作业区域的海水深度，确保其在平台设计的适用范围内，以保证桩腿在最大行程内能够接触到海床，并有足够的余量'
    },
    {
      checked: false,
      content:
        '降桩操作在拖航完成后进行，此时平台入水约4m，靠水的浮力承载载荷，因此只能对桩腿进行升降操作，千万不能对平台进行升降操作'
    },
    {
      checked: false,
      content: '桩腿应尽量在铅垂状态下进行下放，平台倾斜度需＜0.2°'
    },
    {
      checked: false,
      content:
        '由于四条桩腿基本上是在同尺标处工作，因此在负荷转移及循环行程时动作基本上也是同时到达。只有在海况恶劣，上插销或下插销无法拔出时，才能采用单桩腿操作'
    },
    {
      checked: false,
      content:
        '进行降桩操作时，尽量保证四条桩腿同时动作，保证四条桩腿下降同尺标，避免单桩腿先着海底撞击产生事故的可能性'
    },
    {
      checked: false,
      content: `当某条桩腿的桩靴底部与海床面的距离达到安全缓冲距离时（本平台为3米）时，需要停止该桩腿的下降，其他桩腿继续下降。
        <div>安全缓冲距离计算：</div>
        <div class="ml-[250px]">
        <div class="flex mb-[20px]">
        <div>
          <span class="inline-block w-[320px]">请输入水深L1（m）</span>
          <input id='l1' type="number" class="bg-[#144270] w-[150px] h-[40px] border-none text-[#A6A6A6]"/>
        </div>
         <div class="ml-[50px]">
          <span class="inline-block w-[320px]">请输入横摇角度θ1（°）</span>
          <input id='m1' type="number" class="bg-[#144270] w-[150px] h-[40px] border-none text-[#A6A6A6]"/>
        </div>
        </div>
          <div class="flex mb-[20px]">

         <div >
          <span class="inline-block w-[320px]">请输入桩靴长度L2（m）</span>
          <input id='l2' type="number" class="bg-[#144270] w-[150px] h-[40px] border-none text-[#A6A6A6]"/>
        </div>

         <div class="ml-[50px]">
          <span class="inline-block w-[320px]">请输入纵摇角度θ2（°）</span>
          <input id='m2' type="number" class="bg-[#144270] w-[150px] h-[40px] border-none text-[#A6A6A6]"/>
        </div>
         </div>
         <div>
          <span class="inline-block w-[320px]">请输入桩靴宽度W（m）</span>
          <input id='w' type="number" class="bg-[#144270] w-[150px] h-[40px] border-none text-[#A6A6A6]"/>
        </div>
        </div>
        <div class="flex relative justify-center mt-[50px]">
        <div class="button">确定</div>
        <div id="result" class="absolute right-[300px] top-[50%] text-[#00B050] -translate-y-[50%]"></div>
        </div>

      `
    },
    {
      checked: false,
      content: '桩腿全部触底后，停止动作，切换升平台工况'
    },
    {
      checked: false,
      content: '降桩完成后，平台应在水面漂浮'
    }
  ],
  [DetailType.自动升平台]: [
    {
      checked: false,
      content: `只能对平台进行升降操作，不能对桩腿进行升降操作`
    },
    {
      checked: false,
      content: `平台提升过程中必须保持水平，倾斜度＜0.5度`
    },
    {
      checked: false,
      content:
        '升平台速度较慢，插销动作的时间充裕，操作人员有足够反应时间，所以不论平台在水上(预压前)或出水后(预压后)，都可以在调平平台倾斜后采用“自动”操作，以节约操作时间'
    },
    {
      checked: false,
      content: `由于四条桩腿插入土中的深度不一，因此平台每提升一个工作行程，最多要进行四次桩腿的负荷转移及循环行程`
    },
    {
      checked: false,
      content:
        '平台升到作业所需高度后，需要用固桩块将平台各桩腿固定，避免平台晃动或因卸压而导致下降'
    },
    {
      checked: false,
      content:
        '升平台结束时，在保证平台倾斜角度安全情况下，尽量多使环梁插销插入插销孔，以承受平台重量'
    },
    {
      checked: false,
      content:
        '升平台结束，当桩腿压力下降或平台倾斜导致报警，需立即启动升降系统，为桩腿补压或将平台调平'
    }
  ],
  [DetailType.自动降平台]: [
    {
      checked: false,
      content: '检查液压系统各常开球阀是否处于开启状态'
    },
    {
      checked: false,
      content: '在平台放置一段时间之后，降平台之前，必须先升平台，确保液压油进入管路和阀体'
    },
    {
      checked: false,
      content:
        '由于平台装载不均，致使各桩腿负载差异，且各桩腿的机械及液压系统阻尼值不同，导致溢流致使降平台速度较快，容易出现机械故障、平台倾斜，操作人员要特别集中精神'
    },
    {
      checked: false,
      content:
        '为了确保接近开关显示准确无误，除了在操作前需进行动机前检查，在平台下降时，平台工程师要认真核对每条桩腿的第一个循环周期，若发现上述问题立即停止操作，以免接近开关的误动作造成事故发生'
    },
    {
      checked: false,
      content:
        '降平台过程时，要特别注意平台的倾斜角度。倾斜角度过大会加速桩腿与升桩机构室上、下导向的不规则磨损或刮伤。尽量保持＜0.2°，不能超过0.5°。但如果一发现平台倾斜就执行调平操作，会延长整个操作时间，尤其是平台入水后，频繁调平会延长在水中运转时间，更易发生涌浪撞击插销的现象，得不偿失。因此要不断总结经验，寻找允许的最佳倾斜度'
    },
    {
      checked: false,
      content:
        '降平台时的平台调平可以通过将下降位移大的桩腿暂停动作一会，使倾斜指示回“0”位后，再与其它桩腿一起下降'
    },
    {
      checked: false,
      content: '判断平台下降是否结束：当四条桩腿有杆腔压力明显上升时，平台处于漂浮状态'
    }
  ],
  [DetailType.自动升桩]: [
    {
      checked: false,
      content: '升桩时，只能对桩腿进行升降，不能对平台进行升降'
    },
    {
      checked: false,
      content:
        '升桩前，应确保平台的吃水深度足够，以确保平台的浮力能够承担平台和桩腿上升过程中产生的负载'
    },
    {
      checked: false,
      content:
        '桩腿提升时，观察各桩腿“伸出平台底长度”指示，尽量保证四条桩腿高度相同，以免涌浪将提升慢的桩腿撞击海底造成故障'
    },
    {
      checked: false,
      content: '当四腿高度不同，单动某条桩腿使四条腿等高，再通过联动控制同时提升桩腿'
    }
  ],
  [DetailType.手动降桩]: [
    {
      checked: false,
      content:
        '降桩前应精确测量平台作业区域的海水深度，确保其在平台设计的适用范围内，以保证桩腿在最大行程内能够接触到海床，并有足够的余量'
    },
    {
      checked: false,
      content:
        '降桩操作在拖航完成后进行，此时平台入水约4m，靠水的浮力承载载荷，因此只能对桩腿进行升降操作，千万不能对平台进行升降操作'
    },
    {
      checked: false,
      content: '桩腿应尽量在铅垂状态下进行下放，平台倾斜度需＜0.2°'
    },
    {
      checked: false,
      content:
        '单环紧操作可以选择上环梁或下环梁，程序默认为下环梁；操作人员可以根据实际工况选择需要动作的环梁（未被选择的环梁不动作'
    },
    {
      checked: false,
      content:
        '当两组环梁的插销都在插销孔内时，操作人员需要观察两组环梁的油缸位移位来判断哪组环梁承载，一般位移值小的环梁承受桩腿负载，拔插销时，需要根据实际情况进行负载转移'
    },
    {
      checked: false,
      content: '尽量保证四条桩腿同时动作，保证四条桩腿下降同尺标，避免单桩腿先者撞击海底产生事故'
    },
    {
      checked: false,
      content:
        '四条桩腿基本在同尺标处工作，在负荷转移及循环行程时动作也基本能同时到达。为了缩短时间并继续保持同尺标运动，在操作控制手柄时，同时扳动1、2桩腿（或3、4 桩腿）。当海况恶劣，上插销或下插销无法拔出，此时可单桩腿操作'
    },
    {
      checked: false,
      content: `当某条桩腿的桩靴底部与海床面的距离达到安全缓冲距离时（本平台为2~3米）时，需要停止该桩腿的下降，其他桩腿继续下降
        <div>安全缓冲距离计算：</div>
        <div class="ml-[250px]">
        <div class="flex mb-[20px]">
        <div>
          <span class="inline-block w-[320px]">请输入水深L1（m）</span>
          <input id='l1' type="number" class="bg-[#144270] w-[150px] h-[40px] border-none text-[#A6A6A6]"/>
        </div>
         <div class="ml-[50px]">
          <span class="inline-block w-[320px]">请输入横摇角度θ1（°）</span>
          <input id='m1' type="number" class="bg-[#144270] w-[150px] h-[40px] border-none text-[#A6A6A6]"/>
        </div>
        </div>
          <div class="flex mb-[20px]">

         <div >
          <span class="inline-block w-[320px]">请输入桩靴长度L2（m）</span>
          <input id='l2' type="number" class="bg-[#144270] w-[150px] h-[40px] border-none text-[#A6A6A6]"/>
        </div>

         <div class="ml-[50px]">
          <span class="inline-block w-[320px]">请输入纵摇角度θ2（°）</span>
          <input id='m2' type="number" class="bg-[#144270] w-[150px] h-[40px] border-none text-[#A6A6A6]"/>
        </div>
         </div>
         <div>
          <span class="inline-block w-[320px]">请输入桩靴宽度W（m）</span>
          <input id='w' type="number" class="bg-[#144270] w-[150px] h-[40px] border-none text-[#A6A6A6]"/>
        </div>
        </div>
        <div class="flex relative justify-center mt-[50px]">
        <div class="button">确定</div>
        <div id="result" class="absolute right-[300px] top-[50%] text-[#00B050] -translate-y-[50%]"></div>
        </div>


        `
    },
    {
      checked: false,
      content: '降桩完成后，平台应在水面漂浮'
    }
  ],
  [DetailType.手动升平台]: [
    {
      checked: false,
      content: '只能对平台进行升降操作，不能对桩腿进行升降操作'
    },
    {
      checked: false,
      content: '平合提升过程中必须保证倾斜度＜0.3°'
    },
    {
      checked: false,
      content:
        '升平台速度较慢，插销动作时间充裕，操作人员思想反应时间足够，因此不论平台在水上还是出水后，都可以在平台调平后采用“自动升平台”操作，以加快平台提升操作速度，节约时间'
    },
    {
      checked: false,
      content:
        '哪组环梁的插销在插销孔内，手柄控制动作哪组环梁，另一组环梁则进行空环梁自动升降；当两组环梁的插销都在插销孔内时，观察两组环梁的油缸位移值，位移值小的环梁进行升降动作，拔出位移值大环梁内的插销'
    },
    {
      checked: false,
      content: '桩腿伸出平台底后，需注意伸出的最大长度，该长度与平台总体操作要求保持一致'
    },
    {
      checked: false,
      content:
        '由于四条桩腿入土深度不一，因此平台每提升一个工作行程，最多进行四次桩腿的负荷转移及循环行程'
    },
    {
      checked: false,
      content:
        '升平台结束时，当桩腿压力下降或平台倾斜导致报警，需立即启动升降系统，为桩腿补压或将平台调平'
    },
    {
      checked: false,
      content:
        '升平台结束时，在保证平台倾斜角度安全情况下，尽量使多的环梁插销插入插销孔，以承受平台重量'
    },
    {
      checked: false,
      content: '平台升到指定气隙后，需要用固桩块将平台各桩腿固定，避免平台晃动或因卸压而导致下降'
    }
  ],
  [DetailType.插桩]: [
    {
      checked: false,
      content:
        '插桩前，需要提前勘探海床，了解海床的土层硬度、沉积层深度及承载能力，确保海床能够保证桩腿插入并支撑平台站稳，参考地质数据了解桩腿可入泥深度'
    },
    {
      checked: false,
      content: '插桩过程中，只能对桩腿进行升降操作，不能对平台进行升降操作'
    },
    {
      checked: false,
      content:
        '判断桩腿是否触底：观察单个桩腿载荷（单桩腿所有油缸的载荷之和）变化，载荷从桩腿自重（本平台为-1100吨）到0（此时桩腿慢慢入泥），再到1/6的船体总重（本平台的1/6船体总重为3700吨）。当单桩载荷到达1/6的船体总重说明桩腿已经入泥或到达预定位置'
    },
    {
      checked: false,
      content:
        '当某一桩腿先触底，停止该桩腿的下降，其他三条桩腿继续下降。使4条桩腿接触海底的时间间隔尽量短'
    },
    {
      checked: false,
      content:
        '在部分桩腿触底后，需要实时评估平台的动态载荷，当平台载荷在-1100~3700吨范围内，则说明平台安全，可以继续进行其他桩腿的下降'
    },
    {
      checked: false,
      content: '桩腿全部触底后，停止动作，切换升平台工况'
    }
  ],
  [DetailType.预压载]: [
    {
      checked: false,
      content:
        '预压载前，确保所有设备（如液压泵、加载装置等）功能正常，且压力系统能够稳定施加负载。还需确保波浪高度和潮汐变化在可控范围内（波高不应超过1米），以减少对设备和施加载荷的影响'
    },
    {
      checked: false,
      content:
        '预压前调平平台，保证倾斜度＜0.2°；预压载时，实时调平平台，此时的平台倾斜是由于海底软硬度不均造成的'
    },
    {
      checked: false,
      content:
        '若作业环境为上硬下软的双层地基场地，该场地必须满足以下两种情况之一:硬层的承载力不大，能容许桩腿全部穿过该层；硬层有足够大的承载能力，能安全地支持桩腿，其穿刺破坏的安全系数至少为1.5倍'
    },
    {
      checked: false,
      content:
        '预压载操作只允许对角桩腿成对进行，如先预压 2#、3#桩腿，则后压 1#、4#桩腿。在预压前观察桩腿载荷，先预压桩腿载荷之和小的一组对角桩腿'
    },
    {
      checked: false,
      content:
        '预压载时，上、下环梁的两组插销都必须在插销孔内，从而确保上、下环梁的提升油缸同时出力，直到桩腿载荷达到预压载荷'
    },
    {
      checked: false,
      content:
        '为了使预压载工作顺利进行，避免在预压中进行负荷转移及循环行程，应观察四条桩腿的插销位置是否够预压载行程，如不足可待平台提升状态交替完毕后，再改为预压状态，这样可节约预压时间'
    },
    {
      checked: false,
      content:
        '预压阶段如果一条桩腿的环梁走到最大行程，要立即停止预压，并完成环梁的负荷转移和行程循环后(即环梁从最大行程走到最小行程，插销重新插入插销孔)，再继续进行预压操作'
    },
    {
      checked: false,
      content: '当手柄打到两边的“环梁下降”操作时，触摸屏默认选择双环梁下降'
    },
    {
      checked: false,
      content:
        '预压阶段的插土深度不能太浅，若插土太浅，水流冲刷会使土的抗力变小，造成桩腿下沉、水平移位等问题。若经过加大预压负荷，仍达不到该深度，则平台须考虑重新选择作业区域；预压阶段的插土深度不能太深，若插土太深，后续拔桩困难甚至可能拔不出，也须考虑重新选择作业区域'
    },
    {
      checked: false,
      content: '预压稳定时间为 15 分钟，可根据作业区域的地址和海况作出相应的改变'
    }
  ],
  [DetailType.手动降平台]: [
    {
      checked: false,
      content: '检查液压系统主控制阀总成截止阀是否处于开启状态'
    },
    {
      checked: false,
      content:
        '为了确保接近开关显示准确无误，除了在未操作前需进行检查，在平台下降时平台工程师对每条桩腿的第一个循环周期要认真核对，发现问题立即停止操作，以免接近开关的误动作造成事故发生'
    },
    {
      checked: false,
      content:
        '由于平台装载不均，致使各桩腿负载差异，且各桩腿的机械及液压系统阻尼值不同，所以降平台速度较快，平台易产生倾斜，容易出现各种机械故障，如果不及时采取措施便会扩大事故，所以降平台时操作人员要特别集中精神'
    },
    {
      checked: false,
      content:
        '平台下降过程中，需密切关注平台的倾斜度，保证倾斜度＜0.3°。在0.2°时即需调节，让下降快的桩腿稍暂停动作，使倾斜指示回“0”位后，再一起动作下降。倾斜度过大会加速桩腿与升桩机构室上、下导向的不规则磨损或刮伤，但如一发现平台倾斜即调平，反而延长了整个操作时间，尤其平台已入水后，频繁的调平延长了在水中运转时间，更易发生涌浪撞击插销的现象。要不断总结经验，导找允许的最佳倾斜度'
    },
    {
      checked: false,
      content:
        '当平台放置时间超过一天以上时，则每次“降平台”前均应先“升平台”且至少往上走100mm，确保液压管路充满液压油'
    },
    {
      checked: false,
      content: '采用自动控制可以大大节省操作时间'
    }
  ],
  [DetailType.拔桩]: [
    {
      checked: false,
      content:
        '拔桩操作前，应确保平台应降至平台吃水要求（本平台为4m），避免因拔桩操作导致平台倾斜或失稳'
    },
    {
      checked: false,
      content: '拔桩操作应在良好的海洋条件下进行，波高<0.5m，风速<15节（约7.7米/秒）'
    },
    {
      checked: false,
      content: '拔桩前需要冲桩'
    },
    {
      checked: false,
      content: '拔桩操作前，应根据作业海区的具体情况制定出拔桩方案'
    },
    {
      checked: false,
      content:
        '拔桩前确认上、下环梁的两组插销均插入插销孔内，确保上、下环梁的提升油缸同时出力，然后才能进行拔桩操作，直到桩腿拔出海底为止'
    },
    {
      checked: false,
      content:
        '为了使拔桩工作顺利进行，避免在拔桩过程中进行负荷转移及循环行程，应观察四条桩腿的插销位置是否够拔桩，可以先拔提升油缸行程大的对角线腿'
    },
    {
      checked: false,
      content:
        '刚开始可以4条桩腿同时拔桩，再对角桩腿（如1#、4#桩腿或 2#、3#桩腿）成对拔桩，最好不要单条桩腿拔桩。拔桩时，只能做交替间隙操作，先稍拔1#、4#桩腿，再改拔2#、3#桩腿，继而再拔1#、4#桩腿，如此交替直至四条桩腿相继拔松为止'
    },
    {
      checked: false,
      content:
        '实际拔桩过程中，根据拔桩阻力不同，可能需要双环梁动作或单环梁动作；但是，工况默认升降系统双环梁拔桩，升降系统单环梁拔桩类似为升桩腿工况'
    }
  ],
  [DetailType.手动升桩]: [
    {
      checked: false,
      content: '自动升柱，可以大大提升效率'
    },
    {
      checked: false,
      content:
        '哪组环梁的插销在插销孔内，手柄控制动作哪组环梁；当两组环梁的插销都在插销孔内时，观察两组环梁的油缸位移位，位移值大的环梁进行升动作，拔出位移值小的环梁的插销'
    },
    {
      checked: false,
      content: '多条桩腿手动时，尽量选择同一组环梁动作'
    },
    {
      checked: false,
      content: '在长途拖航前可先将木楔封住插销后部，到达目的地后，立即补压然后启封'
    }
  ]
}
const types = ref(valueMap[v])
</script>

<style scoped lang="scss"></style>

<template>
  <template v-if="show">
    <div class="flex items-center justify-between">
      <div>
        <div class="text-white text-[28px] mb-[30px]">
          报警原因分析：当前{{ selected }}#桩腿偏高
        </div>
        <div
          class="text-[28px] mb-[30px]"
          v-for="(item, index) in data[selected][auto ? 'auto' : 'manual']"
          :key="index"
        >
          <label class="cursor-pointer flex items-center text-white mb-[10px]">
            <input
              v-model="item.checked"
              type="checkbox"
              class="size-[30px] flex-shrink-0 mr-[10px]"
            />
            <div class="flex items-center">
              <div :style="{ opacity: item.checked ? 1 : 0.5 }" v-html="item.content"></div>
              <img class="size-[150px]" :src="item.image" />
            </div>
          </label>
        </div>
      </div>
      <div class="mr-[50px] mt-[20px]">
        <img class="h-[400px]" src="@/assets/images/syt.png" />
      </div>
    </div>
  </template>
  <template v-else>
    <div class="text-[#B4D7FD] text-[30px] mt-[40px] text-center">
      在下图气泡仪中选中气泡所在位置，并选择调平方式
    </div>
    <div class="mt-[30px] flex justify-center items-center">
      <div class="relative size-[300px]">
        <div
          @click="select(1)"
          :class="selected === 1 ? 'bg-black opacity-30' : ''"
          class="absolute left-0 rounded-tl-[150px] top-0 size-[150px] cursor-pointer"
        ></div>
        <div
          @click="select(2)"
          :class="selected === 2 ? 'bg-black opacity-30' : ''"
          class="absolute rounded-tr-[150px] right-0 top-0 size-[150px] cursor-pointer"
        ></div>
        <div
          @click="select(3)"
          :class="selected === 3 ? 'bg-black opacity-30' : ''"
          class="absolute bottom-0 rounded-bl-[150px] left-0 size-[150px] cursor-pointer"
        ></div>
        <div
          @click="select(4)"
          :class="selected === 4 ? 'bg-black opacity-30' : ''"
          class="absolute bottom-0 rounded-br-[150px] right-0 size-[150px] cursor-pointer"
        ></div>
        <img src=" @/assets/images/ptqx.png" class="absolute w-full h-full -z-10" />
      </div>

      <div class="text-[30px] text-black ml-[50px]">
        <div @click="showCheckList(true)" class="button cursor-pointer text-center mb-[40px]">
          自动调平
        </div>
        <div @click="showCheckList(false)" class="button cursor-pointer text-center">手动调平</div>
      </div>
    </div>
  </template>
</template>
<script lang="ts" setup>
import { useTitleStore } from '@/store/title.ts'
import { ref } from 'vue'
import { getImageUrl } from '@/utils/url.ts'
const selected = ref<number>(0)
const auto = ref(false)
const show = ref(false)
const useTitle = useTitleStore()
useTitle.setSubTitle('操作故障-平台倾斜')

const select = (num: number) => {
  selected.value = num
}
const showCheckList = (isAuto: boolean) => {
  if (selected.value) {
    auto.value = isAuto
    show.value = true
  }
}

const data = ref({
  '1': {
    auto: [
      {
        checked: false,
        content: `先同时升2#和4#桩腿，将气泡仪中气泡调至水平线上`,
        image: getImageUrl('1象限-1.png')
      },
      {
        checked: false,
        content: '再同时升3#和4#桩腿，将气泡仪中气泡调至原点',
        image: getImageUrl('1象限-2.png')
      }
    ],
    manual: [
      {
        checked: false,
        content: '先交替循环升2#和4#桩腿，将气泡仪中气泡调至水平线上',
        image: getImageUrl('1象限-1.png')
      },
      {
        checked: false,
        content: '再交替循环升3#和4#桩腿，将气泡仪中气泡调至原点',
        image: getImageUrl('1象限-2.png')
      }
    ]
  },
  '2': {
    auto: [
      {
        checked: false,
        content: `先同时升1#和3#桩腿，将气泡仪中气泡调至水平线上`,
        image: getImageUrl('2象限-1.png')
      },
      {
        checked: false,
        content: '再同时升3#和4#桩腿，将气泡仪中气泡调至原点',
        image: getImageUrl('2象限-2.png')
      }
    ],
    manual: [
      {
        checked: false,
        content: '先交替循环升1#和3#桩腿，将气泡仪中气泡调至水平线上',
        image: getImageUrl('2象限-1.png')
      },
      {
        checked: false,
        content: '再交替循环升3#和4#桩腿，将气泡仪中气泡调至原点',
        image: getImageUrl('2象限-2.png')
      }
    ]
  },
  '3': {
    auto: [
      {
        checked: false,
        content: `先同时升2#和4#桩腿，将气泡仪中气泡调至水平线上`,
        image: getImageUrl('3象限-1.png')
      },
      {
        checked: false,
        content: '再同时升1#和2#桩腿，将气泡仪中气泡调至原点',
        image: getImageUrl('3象限-2.png')
      }
    ],
    manual: [
      {
        checked: false,
        content: '先交替循环升2#和4#桩腿，将气泡仪中气泡调至水平线上',
        image: getImageUrl('3象限-1.png')
      },
      {
        checked: false,
        content: '再交替循环升1#和2#桩腿，将气泡仪中气泡调至原点',
        image: getImageUrl('3象限-2.png')
      }
    ]
  },
  '4': {
    auto: [
      {
        checked: false,
        content: `先同时升1#和3#桩腿，将气泡仪中气泡调至水平线上`,
        image: getImageUrl('4象限-1.png')
      },
      {
        checked: false,
        content: '再同时升1#和2#桩腿，将气泡仪中气泡调至原点',
        image: getImageUrl('4象限-2.png')
      }
    ],
    manual: [
      {
        checked: false,
        content: '先交替循环升1#和3#桩腿，将气泡仪中气泡调至水平线上',
        image: getImageUrl('4象限-1.png')
      },
      {
        checked: false,
        content: '再交替循环升1#和2#桩腿，将气泡仪中气泡调至原点',
        image: getImageUrl('4象限-2.png')
      }
    ]
  }
})
</script>

<style scoped></style>

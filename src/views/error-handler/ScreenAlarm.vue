<template>
  <Block class="px-[100px]" v-slot="{ item }" :data="data">
    <img class="size-[50px]" :src="getImageUrl(item.icon)" />
    <div>{{ item.title }}</div>
  </Block>
</template>
<script lang="ts" setup>
import { getImageUrl } from '@/utils/url.ts'
import Block from '@/components/Block.vue'
import { DetailType } from '@/views/error-handler/constants.ts'
const data = [
  {
    title: 'Ⅰ级报警',
    color: '#FAFB00',
    icon: 'error-2.svg',
    size: 'small',
    links: [
      {
        name: DetailType[1],
        path: `/error-handler/screen-alarm/detail?v=${DetailType.倾斜传感器故障}&type=1`
      },
      {
        name: '集控台主电源失效',
        path: `/error-handler/screen-alarm/detail?v=${DetailType.集控台主电源失效}&type=1`
      },
      {
        name: '平台倾斜超限报警',
        path: `/error-handler/screen-alarm/detail?v=${DetailType.平台倾斜超限报警}&type=1`
      },
      {
        name: '桩腿工况选择错误',
        path: `/error-handler/screen-alarm/detail?v=${DetailType.桩腿工况选择错误}&type=1`
      },
      {
        name: '桩腿液压高油温报警',
        path: `/error-handler/screen-alarm/detail?v=${DetailType.桩腿液压高油温报警}&type=1`
      },
      {
        name: '桩腿泵站油箱低液位',
        path: `/error-handler/screen-alarm/detail?v=${DetailType.桩腿泵站油箱低液位}&type=1`
      },
      {
        name: '桩腿泵站油箱高液位',
        path: `/error-handler/screen-alarm/detail?v=${DetailType.桩腿泵站油箱高液位}&type=1`
      },
      {
        name: '桩腿泵站回油滤器FS堵塞',
        path: `/error-handler/screen-alarm/detail?v=${DetailType.桩腿泵站回油滤器FS堵塞}&type=1`
      },
      {
        name: '桩腿保压油缸滑移',
        path: `/error-handler/screen-alarm/detail?v=${DetailType.桩腿保压油缸滑移}&type=1`
      }
    ]
  },
  {
    title: 'Ⅱ级报警',
    color: '#FE6200',
    icon: 'error.svg',
    links: [
      {
        name: '插销插入失败',
        path: `/error-handler/screen-alarm/detail?v=${DetailType.插销插入失败}&type=2`
      },
      {
        name: '插销拔出失败',
        path: `/error-handler/screen-alarm/detail?v=${DetailType.插销拔出失败}&type=2`
      },
      {
        name: '某个桩腿负荷超限',
        path: `/error-handler/screen-alarm/detail?v=${DetailType.某个桩腿负荷超限}&type=2`
      },
      {
        name: '桩腿液压高油温停机',
        path: `/error-handler/screen-alarm/detail?v=${DetailType.桩腿液压高油温停机}&type=2`
      },
      {
        name: '某个桩腿上限位',
        path: `/error-handler/screen-alarm/detail?v=${DetailType.某个桩腿上限位}&type=2`
      },
      {
        name: '某个桩腿下限位',
        path: `/error-handler/screen-alarm/detail?v=${DetailType.某个桩腿下限位}&type=2`
      },
      {
        name: '平台倾斜超限停机',
        path: `/error-handler/screen-alarm/detail?v=${DetailType.平台倾斜超限停机}&type=2`
      }
    ]
  },
  {
    title: 'Ⅲ级报警',
    color: '#F90000',
    icon: 'error-1.svg',
    links: [
      {
        name: '紧急停机',
        path: `/error-handler/screen-alarm/detail?v=${DetailType.紧急停机}&type=3`
      },
      {
        name: '桩腿PU电机断相',
        path: `/error-handler/screen-alarm/detail?v=${DetailType.桩腿PU电机断相}&type=3`
      },
      {
        name: '桩腿PU电机过载',
        path: `/error-handler/screen-alarm/detail?v=${DetailType.桩腿PU电机过载}&type=3`
      }
    ]
  }
]
</script>

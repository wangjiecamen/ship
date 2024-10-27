<template>
  <Block class="px-[300px]" v-slot="{ item }" :data="data">
    <div>{{ item.title }}</div>
  </Block>
</template>
<script lang="ts" setup>
import Block from '@/components/Block.vue'
import { DetailType } from '@/views/operation-guide/constants.ts'

const data = [
  {
    title: '常规工况',
    links: [
      { name: '升平台', path: `/operation-guide/lift` },
      { name: '预加载', path: `/operation-guide/detail?v=${DetailType['预加载']}` },
      { name: '拔桩', path: `/operation-guide/detail?v=${DetailType['拔桩']}` }
    ]
  },
  {
    title: '应急工况',
    links: [
      { name: '插销失效', path: `/operation-guide/detail?v=${DetailType['插销失效']}` },
      {
        name: '有杆腔液压管路爆管',
        path: `/operation-guide/detail?v=${DetailType['有杆腔液压管路爆管']}`
      },
      {
        name: '无杆腔液压管路爆管',
        path: `/operation-guide/detail?v=${DetailType['无杆腔液压管路爆管']}`
      },
      {
        name: '集中控制台失效',
        path: `/operation-guide/detail?v=${DetailType['集中控制台失效']}`
      },
      { name: '桩腿CPU故障', path: `/operation-guide/detail?v=${DetailType['桩腿CPU故障']}` }
    ]
  }
]
</script>

<style scoped lang="scss"></style>

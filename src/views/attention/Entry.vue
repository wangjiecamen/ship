<template>
  <Block class="px-[100px]" v-slot="{ item }" :data="data">
    <div>{{ item.title }}</div>
  </Block>
</template>
<script lang="ts" setup>
import Block from '@/components/Block.vue'
import { DetailType } from '@/views/attention/constants.ts'

const data = [
  {
    title: '综合操作',
    links: [
      { name: '通用注意事项', path: `/attention/detail?v=${DetailType.通用注意事项}` },
      { name: '自动操作注意事项', path: `/attention/detail?v=${DetailType.自动操作注意事项}` },
      { name: '手动操作注意事项', path: `/attention/detail?v=${DetailType.手动操作注意事项}` }
    ]
  },
  {
    title: '自动操作',
    links: [
      { name: '自动降桩', path: `/attention/detail?v=${DetailType.自动降桩}` },
      { name: '自动升平台', path: `/attention/detail?v=${DetailType.自动升平台}` },
      { name: '自动降平台', path: `/attention/detail?v=${DetailType.自动降平台}` },
      { name: '自动升桩', path: `/attention/detail?v=${DetailType.自动升桩}` }
    ]
  },
  {
    title: '手动操作',
    links: [
      { name: '手动降桩', path: `/attention/detail?v=${DetailType.手动降桩}` },
      { name: '手动升平台', path: `/attention/detail?v=${DetailType.手动升平台}` },
      { name: '预压载', path: `/attention/detail?v=${DetailType.预压载}` },
      { name: '手动降平台', path: `/attention/detail?v=${DetailType.手动降平台}` },
      { name: '拔桩', path: `/attention/detail?v=${DetailType.拔桩}` },
      { name: '手动升桩', path: `/attention/detail?v=${DetailType.手动升桩}` }
    ]
  }
]
</script>

<style scoped lang="scss"></style>

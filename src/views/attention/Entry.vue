<template>
  <Block class="px-[100px]" v-slot="{ item }" :data="data">
    <div>{{ item.title }}</div>
  </Block>
</template>
<script lang="ts" setup>
import Block from '@/components/Block.vue'

const data = [
  {
    title: '综合操作',
    links: [
      { name: '通用注意事项', path: '' },
      { name: '自动操作', path: '' },
      { name: '手动操作', path: '' }
    ]
  },
  {
    title: '自动操作',
    links: [
      { name: '降桩', path: '' },
      { name: '升平台', path: '' },
      { name: '降平台', path: '' },
      { name: '升桩', path: '' }
    ]
  },
  {
    title: '手动操作',
    links: [
      { name: '降桩', path: '' },
      { name: '升平台', path: '' },
      { name: '预压裁', path: '' },
      { name: '降平台', path: '' },
      { name: '拔桩', path: '' },
      { name: '升桩', path: '' }
    ]
  }
]
</script>

<style scoped lang="scss"></style>

<template>
  <Block class="px-[300px]" v-slot="{ item }" :data="data">
    <div>{{ item.title }}</div>
  </Block>
</template>
<script lang="ts" setup>
import Block from '@/components/Block.vue'

const data = [
  {
    title: '常规工况',
    links: [
      { name: '升平台', path: '' },
      { name: '预压载', path: '' },
      { name: '拔桩', path: '' }
    ]
  },
  {
    title: '应急工况',
    links: [
      { name: '插销失效', path: '' },
      { name: '有杆腔液压管路爆管', path: '' },
      { name: '无杆腔液压管路爆管', path: '' },
      { name: '集中控制台失效', path: '' },
      { name: '桩腿CPU故障', path: '' }
    ]
  }
]
</script>

<style scoped lang="scss"></style>

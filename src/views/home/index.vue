<template>
  <div class="">
    <div v-for="block in blocks" class="block">
      <Title :icon="block.icon" :title="block.title"></Title>
      <div v-for="item in block.items" class="side-item" @click="goTo(item)">
        <img src="@/assets/images/st.svg" />
        {{ item.title }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Title from '@/components/Title.vue'
const router = useRouter()
const blocks = [
  {
    title: '操作指导',

    icon: 'czzd.svg',
    items: [
      {
        title: '常规工况',
        path: ''
      },
      {
        title: '应急工况',
        path: ''
      }
    ]
  },
  {
    title: '异常处理',
    icon: 'yccl.svg',
    items: [
      {
        title: '触摸屏报警',
        path: ''
      },
      {
        title: '操作故障',
        path: ''
      }
    ]
  },
  {
    title: '注意事项',
    icon: 'yccl.svg',
    items: [
      {
        title: '操作流程',
        path: ''
      },
      {
        title: '设备使用',
        path: ''
      },
      {
        title: '安全防范',
        path: ''
      },
      {
        title: '环境影响',
        path: ''
      },
      {
        title: '应急处理',
        path: ''
      }
    ]
  },
  {
    title: '法律法规',
    icon: 'flfg.svg',
    items: [
      {
        title: '安全作业',
        path: '/law-search?v=aqzy'
      },
      {
        title: '环境保护',
        path: '/law-search?v=xjbh'
      },
      {
        title: '设备管理',
        path: '/law-search?v=sbgl'
      },
      {
        title: '作业许可',
        path: '/law-search?v=zyxk'
      }
    ]
  }
]
const goTo = (item: any) => {
  const regex = /[?&]v=([^&]*)/
  const match = item.path.match(regex)
  router.push({ path: item.path, query: { v: match[1] } })
}
</script>

<style scoped lang="less">
.block {
  position: absolute;
  &:nth-child(1) {
    top: 150px;
    left: 80px;
  }
  &:nth-child(2) {
    top: 600px;
    left: 80px;
  }
  &:nth-child(3) {
    top: 150px;
    right: 80px;
  }
  &:nth-child(4) {
    top: 600px;
    right: 80px;
  }
}
.side-item {
  font-size: 20px;
  width: 400px;
  height: 50px;
  display: flex;
  align-items: center;
  color: white;
  background-color: rgba(50, 96, 155, 0.5);
  border-left: 1px solid #5abae3;
  margin-bottom: 10px;
  cursor: pointer;
  img {
    margin-left: 10px;
    width: 18px;
    height: 30px;
  }
}
</style>

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
import { useUserStore } from '@/store/user.ts'

const router = useRouter()
const useUser = useUserStore()
const blocks = [
  {
    title: '作业流程指导',
    icon: 'czzd.svg',
    items: [
      {
        title: '常规工况',
        path: '/operation-guide/entry'
      },
      {
        title: '应急工况',
        path: '/operation-guide/entry'
      }
    ]
  },
  {
    title: '法律法规参考',
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
  },
  {
    title: '作业要点提示',
    icon: 'yccl.svg',
    items: [
      {
        title: '综合操作',
        path: '/attention/entry'
      },
      {
        title: '自动操作',
        path: '/attention/entry'
      },
      {
        title: '手动操作',
        path: '/attention/entry'
      }
    ]
  },
  {
    title: '异常排查处理',
    icon: 'yccl.svg',
    items: [
      {
        title: '触摸屏报警',
        path: '/error-handler/screen-alarm'
      },
      {
        title: '操作故障',
        path: '/error-handler/operation-error'
      }
    ]
  }
]
const goTo = (item: any) => {
  if (useUser.user) {
    router.push(item.path)
  } else {
    useUser.showLogin = true
  }
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
  font-size: 25px;
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

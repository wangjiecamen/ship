<template>
  <div class="text-[28px]" v-for="(item, index) in types" :key="index">
    <label class="cursor-pointer flex text-white mb-[20px]">
      <input v-model="item.checked" type="checkbox" class="size-[30px] flex-shrink-0 mr-[10px]" />
      <div :style="{ opacity: item.checked ? 0.5 : 1 }" v-html="item.content"></div>

      <a
        class="ml-[20px] text-white underline underline-offset-[8px]"
        v-if="item.button"
        @click="item.button.link"
      >
        {{ item.button.name }} >
      </a>
    </label>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>

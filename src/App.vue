<template>
  <router-view v-slot="{ Component }">
    <!-- <transition name="van-slide-left" mode="out-in"> -->
      <keep-alive :exclude="[]">
        <component :is="Component" />
      </keep-alive>
    <!-- </transition> -->
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang='less' scoped>
</style>

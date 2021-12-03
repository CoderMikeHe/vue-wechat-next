<template>
  <div class="xxxxxxxx" @click="router.back()">
    kkkk
  </div>
</template>

<script>
import {onMounted}  from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: "Test1",
  setup() {
    const router = useRouter()
    onMounted(() => {
      console.log('test1 onMounted ....');
    })
    return {
      router
    }
  }
}
</script>

<style lang="less" scoped>
.xxxxxxxx {
  height: 1000px;
}
</style>
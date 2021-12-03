<template>
  <div class="xxxxxxxx" @click="router.push({name:'Test1'})">
    jjj{{ xx }}
  </div>
</template>

<script>
import {onMounted, computed}  from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: "Test",
  setup() {
    const router = useRouter()
    onMounted(() => {
      console.log('test onMounted ....');
    })

    const sss = 0
    const xx = computed(() => {
      console.log('休息休息');
      return sss
    })
    return {
      router,
      xx
    }
  }
}
</script>

<style lang="less" scoped>
.xxxxxxxx {
  height: 1000px;
}
</style>
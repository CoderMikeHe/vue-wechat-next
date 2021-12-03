<template>
  <div class="wc-layout moments">
    <van-pull-refresh v-model="state.loading" style="min-height: 100vh;" @refresh="onRefresh">
      <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
      <template #pulling="props">
        <img
          class="doge"
          src="https://img.yzcdn.cn/vant/doge.png"
          :style="{ transform: `scale(${props.distance / 80})` }"
        />
        <span>{{ props.distance }}</span>
      </template>

      <!-- 释放提示 -->
      <template #loosing>
        <img class="doge" src="https://img.yzcdn.cn/vant/doge.png" />
      </template>

      <!-- 加载提示 -->
      <template #loading>
        <img class="doge" src="https://img.yzcdn.cn/vant/doge-fire.jpg" />
      </template>

      
      <MomentsProfile class="moment__profile" />
      <p>刷新次数: {{ state.count }}</p>
      
    </van-pull-refresh>
  </div>
</template>

<script lang='ts'>
// vue
import { defineComponent, computed, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
// Comps
import { Toast } from 'vant';
import MomentsProfile from './components/MomentsProfile.vue';


export default defineComponent({
  name: "Moments",
  components: {
    MomentsProfile,
  },
  setup() {
    const state = reactive({
      count: 0,
      loading: false,
    });
    const onRefresh = () => {
      setTimeout(() => {
        Toast('刷新成功');
        state.loading = false;
        state.count++;
      }, 1000);
    };

    return {
      state,
      onRefresh,
    };
  }
});
</script>

<style lang='less' scoped>
.wc-layout.moments {
  .moment__profile {
    // margin-top: -64px;
  }
} 
</style>
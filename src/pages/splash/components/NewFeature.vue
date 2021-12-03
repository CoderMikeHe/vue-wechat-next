<template>
  <div class="wc-layout new-feature">
    <div class="wc-layout__bd">
      <van-swipe style="height: 100%;" :show-indicators="false" :loop="false" @change="onChange">
        <van-swipe-item v-for="item in srcs" :key="item.src">
          <div class="new-feature-item" :style="{'background-image': `url(${item.src})` }"></div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <transition name="van-fade">
      <div v-if="currentIndex === srcs.length - 1" class="skip-button" @click="onSkipBtn"></div>
    </transition>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, ref, reactive, PropType } from "vue";
import { useRoute, useRouter } from "vue-router";

// interface
export interface NewFeatureItem {
  src: string;
}

// 
export default defineComponent({
  name: "NewFeature",
  components: {},
  props: {
    // 数据源
    srcs: {
      type: Array as PropType<NewFeatureItem[]>,
      default: () => []
    },
  },
  emits: [ 'finish' ],
  setup(_, { emit }) {

    const currentIndex = ref(0)

    // 点击跳过按钮
    const onSkipBtn = (event: MouseEvent) => {
      // 回调
      emit('finish')
    }

    // 轮播图
    const onChange = (index: number) => {
      currentIndex.value = index
    }
    return {
      currentIndex,
      onSkipBtn,
      onChange,
    };
  }
});
</script>

<style lang='less' scoped>
.wc-layout.new-feature {
  background-color: rgb(21, 5, 27);

  .skip-button {
    position: absolute;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('assets/new-feature/skip_btn.png');
    // 定宽高
    width: 175px;
    height: 55px;
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    bottom: 48px;
  }

  .new-feature-item {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
  }
}
</style>
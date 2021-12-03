<template>
  <div class="wc-layout ad">
    <div class="wc-layout__bd bg">
      <van-swipe :autoplay="1500" style="height: 100%;" :touchable="false" :show-indicators="false">
        <van-swipe-item v-for="(item, index) in srcs" :key="item.src" @click="onClickItem(index)">
          <div class="ad-item" :style="{'background-image': `url(${item.src})` }"></div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-button class="skip-button" type="primary" color="rgba(255,255,255,0.1)" round @click="onSkipBtn">跳过 {{ count }}</van-button>
  </div>
</template>

<script lang='ts'>
// vue
import { defineComponent, computed, ref, reactive, PropType } from "vue";

// 工具
import { useCountDown, CurrentTime } from '@vant/use';

// interface
export interface ADItem {
  src: string;
}

export default defineComponent({
  name: "AD",
  components: {},
  emits: [ 'finish', 'click-ad' ],
  props: {
    // 数据源
    srcs: {
      type: Array as PropType<ADItem[]>,
      default: () => []
    },
    // 毫秒
    time: {
      type: Number,
      default: 5000
    }
  },
  setup(props, { emit }) {

    // 倒计时数
    const count = ref(5)
    // 初始化倒计时
    const countDown = useCountDown({
      // 倒计时 5
      time: props.time || 5000,
      onChange: (time: CurrentTime) => {
        count.value = time.seconds
      },
      onFinish: () => {
        // 回调
        emit('finish')
      }
    });
    // 开始倒计时
    countDown.start();

    // 点击跳过按钮
    const onSkipBtn = (event: MouseEvent) => {
      // 先暂停定时器
      countDown.pause()
      // 回调
      emit('finish')
    }

    // 点击轮播图
    const onClickItem = (index: number) => {
      emit('click-ad')
    }

    return { 
      count,
      onSkipBtn,
      onClickItem
    };
  }
});
</script>

<style lang='less' scoped>
.wc-layout.ad {
  background-color: rgb(21, 5, 27);
  .wc-layout__bd.bg {
    background-image: url('assets/bg/sky_bg_01_320x490.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
  }

  .skip-button {
    position: absolute;
    top: 25px;
    right: 20px;
    font-size: 12px;
    height: 30px;
  }

  .ad-item {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
  }
}
</style>
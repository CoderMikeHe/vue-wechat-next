<template>
  <div class="wc-layout splash">
    <div class="wc-layout__bd launch-image">
      <splash-ad v-if="mode === 'ad'" :srcs="ads" @finish="onFinish" />
      <new-feature v-else-if="mode === 'newFeature'" :srcs="newFeatures" @finish="onFinish" />
      <!-- <div v-else class="launch-image"></div> -->
    </div>
  </div>
</template>

<script lang='ts'>
// vue3
import { defineComponent, computed, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

// assets
import ad0 from 'assets/ads/121-bigskin-1.jpg';
import ad1 from 'assets/ads/121-bigskin-2.jpg';
import ad2 from 'assets/ads/121-bigskin-3.jpg';
import ad3 from 'assets/ads/121-bigskin-4.jpg';

import newFeature0 from 'assets/new-feature/intro_page_1.png';
import newFeature1 from 'assets/new-feature/intro_page_2.png';
import newFeature2 from 'assets/new-feature/intro_page_3.png';

// 组件
import AD, { ADItem } from './components/AD.vue';
import NewFeature, { NewFeatureItem } from './components/NewFeature.vue';


export default defineComponent({
  name: "Splash",
  components: {
    'splash-ad' : AD,
    NewFeature
  },
  setup() {
    
    const router = useRouter()
    // 当前模式
    const mode = ref('')

    // 广告页数据
    const ads: ADItem[] = [
      {
        src: ad0
      },
      {
        src: ad1
      },
      {
        src: ad2
      },
      {
        src: ad3
      },
    ];

    // 新特性数据
    const newFeatures: NewFeatureItem[] = [
      {
        src: newFeature0
      },
      {
        src: newFeature1
      },
      {
        src: newFeature2
      }
    ];

    // 完成动作
    const onFinish = () => {
      // 跳转到首页
      router.replace('homepage')
    }

    setTimeout(() => {
      mode.value = 'newFeature'
    }, 500);

    return {
      mode,
      ads,
      newFeatures,
      onFinish
    };
  }
});
</script>

<style lang='less' scoped>
.wc-layout.splash {
  background-color: rgb(0, 10, 24);
  .wc-layout__bd {
    &.launch-image {
      background-image: url('assets/launch/launch_image.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
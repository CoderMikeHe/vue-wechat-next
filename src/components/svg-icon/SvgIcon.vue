<template>
  <svg aria-hidden="true" class="wc-svg-icon" :class="[$attrs.class, spin && 'svg-icon-spin']" :style="getStyle">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script>
import { defineComponent, computed } from 'vue';
export default defineComponent({
  name: 'WcSvgIcon',
  props: {
    /// symbolId前缀
    prefix: {
      type: String,
      default: 'icon',
    },
    /// svg 文件名
    name: {
      type: String,
      required: true,
    },
    /// 大小 
    size: {
      type: [Number, String],
      default: 24,
    },
    /// 是否需要旋转动画
    spin: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // 获取symbolId
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    
    // 获取style 
    const getStyle = computed(() => {
      const { size } = props;
      let s = `${size}`;
      s = `${s.replace('px', '')}px`;
      return {
        width: s,
        height: s,
      };
    })

    return { 
      symbolId,
      getStyle 
    };
  },
});
</script>

<style lang="less" scoped>
.wc-svg-icon {
  display: inline-block;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}

.svg-icon-spin {
  animation: spin 1s infinite linear;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate3d(0, 0, 1, 0deg);
    transform: rotate3d(0, 0, 1, 0deg);
  }
  100% {
    -webkit-transform: rotate3d(0, 0, 1, 360deg);
    transform: rotate3d(0, 0, 1, 360deg);
  }
}

@keyframes spin {
  0% {
    -webkit-transform: rotate3d(0, 0, 1, 0deg);
    transform: rotate3d(0, 0, 1, 0deg);
  }
  100% {
    -webkit-transform: rotate3d(0, 0, 1, 360deg);
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
</style>
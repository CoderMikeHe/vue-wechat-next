<template>
  <div class="wc-layout discover">
    <div class="wc-layout__hd">
      <van-nav-bar title="发现" />
    </div>
    <div class="wc-layout__bd">
      <div class="wc-cell-group">
        <van-cell title="朋友圈" :icon="xxoo" center is-link to="moments">
          <template #icon>
            <wc-svg-icon name="discover-icons_outlined_colorful_moment" size="22"></wc-svg-icon>
          </template>
        </van-cell>
      </div>
      <div class="wc-cell-group">
        <van-cell title="视频号" center is-link >
          <template #icon>
            <wc-svg-icon name="discover-icons_outlined_finder" size="22" style="color:#EDA150"></wc-svg-icon>
          </template>
        </van-cell>
      </div>
      <div class="wc-cell-group">
        <van-cell title="扫一扫" center is-link >
          <template #icon>
            <wc-svg-icon name="discover-scan_history_msg" size="22" style="color:#1485EE"></wc-svg-icon>
          </template>
        </van-cell>
        <van-cell title="摇一摇" center is-link >
          <template #icon>
            <wc-svg-icon name="discover-icons_outlined_shake" size="22" style="color:#1485EE"></wc-svg-icon>
          </template>
        </van-cell>
      </div>
      <div class="wc-cell-group">
        <van-cell title="看一看" center is-link >
          <template #icon>
            <wc-svg-icon name="discover-icons_outlined_news" size="22" style="color:#F6C543"></wc-svg-icon>
          </template>
        </van-cell>
        <van-cell title="搜一搜" center is-link >
          <template #icon>
            <wc-svg-icon name="search-icons_outlined_search-logo" size="22" style="color:#FA5151"></wc-svg-icon>
          </template>
        </van-cell>
      </div>
      <div class="wc-cell-group">
        <van-cell title="直播和附近" center is-link >
          <template #icon>
            <wc-svg-icon name="discover-icons_outlined_nearby" size="22" style="color:#1485EE"></wc-svg-icon>
          </template>
        </van-cell>
      </div>
      <div class="wc-cell-group">
        <van-cell title="购物" center is-link >
          <template #icon>
            <wc-svg-icon name="discover-icons_outlined_shop" size="22" style="color:#FA5151"></wc-svg-icon>
          </template>
        </van-cell>
        <van-cell title="游戏" center is-link >
          <template #icon>
            <wc-svg-icon name="discover-icons_outlined_colorful_game" size="22"></wc-svg-icon>
          </template>
        </van-cell>
      </div>
      <div class="wc-cell-group">
        <van-cell title="小程序" center is-link >
          <template #icon>
            <wc-svg-icon name="discover-icons_outlined_miniprogram" size="22" style="color:#6467e8"></wc-svg-icon>
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import xxoo from "assets/icons/discover/icons_outlined_scan.svg";

export default defineComponent({
  name: "Discover",
  components: {},
  setup() {
    // 获取数据
    const fetchLocalData = () => {};

    return {
      xxoo
    };
  }
});
</script>

<style lang='less' scoped>
.wc-layout.discover {
  .wc-layout__bd {

    // fixed bug: :deep() 代替 /deep/
    :deep(.van-cell) {
      .wc-svg-icon {
        margin-right: 12px;
        overflow: hidden;
      }
    }
  }
}
</style>
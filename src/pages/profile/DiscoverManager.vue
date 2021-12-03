<template>
  <div class="wc-layout discover-manager">
    <div class="wc-layout__hd">
      <van-nav-bar title="发现页管理" />
    </div>
    <div class="wc-layout__bd">
      <div class="wc-cell-group">
        <van-cell title="朋友圈" center>
          <template #icon>
            <wc-svg-icon name="discover-icons_outlined_colorful_moment" size="22"></wc-svg-icon>
          </template>
          <template #right-icon>
            <van-switch v-model="checked" active-color="#00C777" inactive-color="#dcdee0" size="24" />
          </template>
        </van-cell>
        <van-cell title="视频号" center>
          <template #icon>
            <wc-svg-icon name="discover-icons_outlined_finder" size="22" style="color:#EDA150"></wc-svg-icon>
          </template>
          <template #right-icon>
            <van-switch v-model="checked" active-color="#00C777" inactive-color="#dcdee0" size="24" />
          </template>
        </van-cell>
        <van-cell title="直播" center>
          <template #icon>
            <wc-svg-icon name="discover-icons_outlined_miniprogram" size="22" style="color:#6467e8"></wc-svg-icon>
          </template>
          <template #right-icon>
            <van-switch v-model="checked" active-color="#00C777" inactive-color="#dcdee0" size="24" />
          </template>
        </van-cell>
        <van-cell title="扫一扫" center>
          <template #icon>
            <wc-svg-icon name="discover-scan_history_msg" size="22" style="color:#1485EE"></wc-svg-icon>
          </template>
          <template #right-icon>
            <van-switch v-model="checked" active-color="#00C777" inactive-color="#dcdee0" size="24" />
          </template>
        </van-cell>
        <van-cell title="摇一摇" center>
          <template #icon>
            <wc-svg-icon name="discover-icons_outlined_shake" size="22" style="color:#1485EE"></wc-svg-icon>
          </template>
          <template #right-icon>
            <van-switch v-model="checked" active-color="#00C777" inactive-color="#dcdee0" size="24" />
          </template>
        </van-cell>
        <van-cell title="看一看" center>
          <template #icon>
            <wc-svg-icon name="discover-icons_outlined_news" size="22" style="color:#F6C543"></wc-svg-icon>
          </template>
          <template #right-icon>
            <van-switch v-model="checked" active-color="#00C777" inactive-color="#dcdee0" size="24" />
          </template>
        </van-cell>
        <van-cell title="搜一搜" center>
          <template #icon>
            <wc-svg-icon name="search-icons_outlined_search-logo" size="22" style="color:#FA5151"></wc-svg-icon>
          </template>
          <template #right-icon>
            <van-switch v-model="checked" active-color="#00C777" inactive-color="#dcdee0" size="24" />
          </template>
        </van-cell>
        <van-cell title="附近" center>
          <template #icon>
            <wc-svg-icon name="discover-icons_outlined_nearby" size="22" style="color:#1485EE"></wc-svg-icon>
          </template>
          <template #right-icon>
            <van-switch v-model="checked" active-color="#00C777" inactive-color="#dcdee0" size="24" />
          </template>
        </van-cell>
        <van-cell title="购物" center>
          <template #icon>
            <wc-svg-icon name="discover-icons_outlined_shop" size="22" style="color:#FA5151"></wc-svg-icon>
          </template>
          <template #right-icon>
            <van-switch v-model="checked" active-color="#00C777" inactive-color="#dcdee0" size="24" />
          </template>
        </van-cell>
        <van-cell title="游戏" center>
          <template #icon>
            <wc-svg-icon name="discover-icons_outlined_colorful_game" size="22"></wc-svg-icon>
          </template>
          <template #right-icon>
            <van-switch v-model="checked" active-color="#00C777" inactive-color="#dcdee0" size="24" />
          </template>
        </van-cell>
        <van-cell title="小程序" center>
          <template #icon>
            <wc-svg-icon name="discover-icons_outlined_miniprogram" size="22" style="color:#6467e8"></wc-svg-icon>
          </template>
          <template #right-icon>
            <van-switch v-model="checked" active-color="#00C777" inactive-color="#dcdee0" size="24" />
          </template>
        </van-cell>
      </div>
    </div>

    <van-action-sheet
      v-model:show="show"
      description="将删除所有个人和群的聊天记录"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "DiscoverManager",
  components: {},
  setup() {
    const show = ref(false);
    const checked = ref(false)
    const actions = [
      { name: '清空聊天记录', color: '#D45047' }
    ];

    return {
      show,
      checked,
      actions
    };
  }
});
</script>

<style lang='less' scoped>
.wc-layout.discover-manager {
  .wc-layout__bd {
    // fixed bug: :deep() 代替 /deep/
    :deep(.van-cell) {
      .wc-svg-icon {
        margin-right: 12px;
        overflow: hidden;
      }

      &.center {
        text-align: center;
      }

      .van-cell__title {
        .plugin {
          .title {
            margin-right: 10px;
          }

          .icon {
            margin-bottom: 4px;
          }

          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
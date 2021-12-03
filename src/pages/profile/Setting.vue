<template>
  <div class="wc-layout setting">
    <div class="wc-layout__hd">
      <van-nav-bar title="设置" />
    </div>
    <div class="wc-layout__bd">
      <div class="setting-cell-item">
        <van-cell title="账号与安全" center is-link />
        <van-cell title="青少年模式" value="未开启" center is-link />
      </div>

      <div class="setting-cell-item">
        <van-cell title="新消息通知" center is-link />
        <van-cell title="隐私" center is-link />
        <van-cell title="通用" center is-link to="general" />
      </div>

      <div class="setting-cell-item">
        <van-cell title="帮助与反馈" center is-link />
        <van-cell title="关于微信"  value="版本8.0.6" center is-link />
      </div>

      <div class="setting-cell-item">
        <van-cell center is-link>
          <template #title>
            <div class="plugin">
              <span class="title">插件</span>
              <img class="icon" src="~assets/setting/WeChat_Lab_Logo_small_15x17@3x.png" alt="" height="17" width="15">
            </div>
          </template>
        </van-cell>
      </div>


      <div class="setting-cell-item">
        <van-cell class="center" title="切换账号" clickable />
      </div>

      <div class="setting-cell-item">
        <van-cell class="center" title="退出登录" clickable @click="show=true" />
      </div>
    </div>

    <van-action-sheet
      v-model:show="show"
      description="退出后不会删除任何历史数据，下次登录依然可以使用本账号"
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
  name: "Setting",
  components: {},
  setup() {
    const show = ref(false);
    const actions = [
      { name: '退出登录', color: '#D45047' }
    ];

    return {
      show,
      actions
    };
  }
});
</script>

<style lang='less' scoped>
.wc-layout.setting {
  .wc-layout__bd {
    .setting-cell-item {
      margin-bottom: 8px;
    }
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
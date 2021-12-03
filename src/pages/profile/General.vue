<template>
  <div class="wc-layout setting">
    <div class="wc-layout__hd">
      <van-nav-bar title="通用" />
    </div>
    <div class="wc-layout__bd">
      <div class="wc-cell-group">
        <van-cell title="深色模式" value="跟随系统" center is-link />
      </div>

      <div class="wc-cell-group">
        <van-cell title="多语言" center is-link />
      </div>

      <div class="wc-cell-group">
        <van-cell title="字体大小" center is-link />
        <van-cell title="聊天背景" center is-link />
        <van-cell title="我的表情" center is-link />
        <van-cell title="照片、视频、文件和通话" center is-link />
      </div>

      <div class="wc-cell-group">
        <van-cell title="听筒模式" >
          <template #right-icon>
            <van-switch v-model="checked" active-color="#00C777" inactive-color="#dcdee0" size="24" />
          </template>
        </van-cell>
      </div>

      <div class="wc-cell-group">
        <van-cell title="发现页管理" center is-link to="discover-manager" />
        <van-cell title="辅助功能" center is-link />
      </div>

      <div class="wc-cell-group">
        <van-cell title="聊天记录备份与迁移" center is-link />
        <van-cell title="存储空间" center is-link />
      </div>

      <div class="wc-cell-group">
        <van-cell class="center" title="清空聊天记录" clickable @click="show=true" />
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
  name: "General",
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
.wc-layout.setting {
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
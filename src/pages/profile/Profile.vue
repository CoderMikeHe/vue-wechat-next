<template>
  <div class="wc-layout profile">
    <div class="wc-layout__bd">
      <div class="profile-cell-item">
        <van-cell title="支付" center is-link >
          <template #icon>
            <wc-svg-icon name="profile-icons_outlined_wechatpay" size="22" style="color:#00C777"></wc-svg-icon>
          </template>
        </van-cell>
      </div>

      <div class="profile-cell-item">
        <van-cell title="收藏" center is-link >
          <template #icon>
            <wc-svg-icon name="profile-icons_outlined_colorful_favorites" size="22"></wc-svg-icon>
          </template>
        </van-cell>
        <van-cell title="朋友圈" center is-link >
          <template #icon>
            <wc-svg-icon name="profile-icons_outlined_album" size="22" style="color:#1485EE"></wc-svg-icon>
          </template>
        </van-cell>
        <van-cell title="视频号" center is-link >
          <template #icon>
            <wc-svg-icon name="discover-icons_outlined_finder" size="22" style="color:#EDA150"></wc-svg-icon>
          </template>
        </van-cell>
        <van-cell title="卡包" center is-link >
          <template #icon>
            <wc-svg-icon name="profile-icons_outlined_colorful_cards" size="22"></wc-svg-icon>
          </template>
        </van-cell>
        <van-cell title="表情" center is-link >
          <template #icon>
            <wc-svg-icon name="search-icons_outlined_sticker" size="22" style="color:#F6C543"></wc-svg-icon>
          </template>
        </van-cell>
      </div>

      <div class="profile-cell-item">
        <van-cell title="设置" center is-link to="setting" >
          <template #icon>
            <wc-svg-icon name="profile-icons_outlined_setting" size="22" style="color:#1485EE"></wc-svg-icon>
          </template>
        </van-cell>
      </div>
    </div>


    
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, ref, reactive, isReactive } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "Profile",
  components: {},
  setup() {

    const show = ref(false)
    const actions = reactive([{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }])

    return {
      show,
      actions
    };
  }
});
</script>

<style lang='less' scoped>
.wc-layout.profile {
  .wc-layout__bd {
    .profile-cell-item {
      margin-bottom: 8px;
    }
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
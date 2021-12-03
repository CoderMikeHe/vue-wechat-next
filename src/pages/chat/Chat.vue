<template>
  <div class="wc-layout chat">
    <div class="wc-layout__hd">
      <van-nav-bar title="微信">
        <template #right>
          <van-popover v-model:show="showPopover" theme="dark" placement="bottom-end" :actions="actions" :offset="[10,12]">
            <template #reference>
              <van-icon name="add-o" size="20" color="#181818" />
            </template>
            <menu-view :actions="actions" />
          </van-popover>
        </template>
      </van-nav-bar>
    </div>

    <div class="wc-layout__bd">
      
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import MenuView from './components/MenuView.vue';

export default defineComponent({
  name: "Chat",
  components: {
    MenuView
  },
  setup() {
    const showPopover = ref(false);

    const actions = [
      { text: '发起群聊', icon: 'mainframe-icons_filled_chats' },
      { text: '添加朋友', icon: 'mainframe-icons_filled_add_friends' },
      { text: '扫一扫', icon: 'mainframe-icons_filled_scan' },
      { text: '收付款', icon: 'mainframe-icons_outlined_pay' },
    ];

    return {
      actions,
      showPopover,
    };
  }
});
</script>



<style lang='less' scoped>
// fxied bug: 这里要去掉 scoped ，不然修改 `.van-popover__arrow` 的 right 设置无效
.wc-layout.chat {
  // fixed bug: :deep() 代替 /deep/
  :deep(.van-popover__wrapper) {
    display: flex;
  }
}



</style>
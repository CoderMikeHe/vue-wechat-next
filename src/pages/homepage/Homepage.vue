<template>
  <div class="wc-layout homepage">
    <div class="wc-layout__bd">
      <component :is="active"></component>
    </div>
    <van-tabbar v-model="active" active-color="#00C777" inactive-color="#191919">
      <van-tabbar-item v-for="item in items" :key="item.name" v-bind="item">
        <span>{{ item.title }}</span>
        <template #icon="props">
          <wc-svg-icon :class="{active: props.active}" :name="props.active ? item.activeIcon : item.inactiveIcon" size="22"></wc-svg-icon>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
// Vue
import { defineComponent, onMounted, ref, reactive } from 'vue';

// components
import Chat from 'pages/chat/Chat.vue'
import Contact from 'pages/contact/Contact.vue'
import Discover from 'pages/discover/Discover.vue'
import Profile from 'pages/profile/Profile.vue'

import xxoo from './xxoo';

export default defineComponent({
  name: 'Homepage',
  components: {
    Chat,
    Contact,
    Discover,
    Profile,
    xxoo
  },
  setup() {
    // 数据源
    // ⚠️：icon: tabbar-xxxxx 其中tabbar-是指文件夹名, xxxx 是文件名称
    const items = reactive([
      {
        title: '微信',
        name: 'Chat',
        activeIcon: 'tabbar-icons_filled_chats',
        inactiveIcon: 'tabbar-icons_outlined_chats'
      },
      {
        title: '通讯录',
        name: 'Contact',
        activeIcon: 'tabbar-icons_filled_contacts',
        inactiveIcon: 'tabbar-icons_outlined_contacts'
      },
      {
        title: '发现',
        name: 'Discover',
        activeIcon: 'tabbar-icons_filled_discover',
        inactiveIcon: 'tabbar-icons_outlined_discover'
      },
      {
        title: '我',
        name: 'Profile',
        activeIcon: 'tabbar-icons_filled_me',
        inactiveIcon: 'tabbar-icons_outlined_me'
      }
    ])
    // 当前活跃的视图
    const active = ref('Chat')
    // 导出数据
    return {
      active,
      items
    }
  }
})
</script>

<style lang="less" scoped>
.wc-layout__bd {
  padding-bottom: @tabbar-height;
}
</style>
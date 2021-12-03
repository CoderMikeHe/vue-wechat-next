<template>
  <div class="menu-view__wrapper">
    <div v-for="(item, index) in actions" :key="index" class="menu-view__action" :class="{'menu-view__action--with-icon': item.icon}" :style="{color: item.color}">
      <wc-svg-icon v-if="item.icon" class="menu-view__action-icon" :name="item.icon" size="24"></wc-svg-icon>
      <div class="menu-view__action-text" :class="{'van-hairline--bottom':index !== actions.length - 1}">{{ item.text }}</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, ref, reactive, PropType } from "vue";
import { useRoute, useRouter } from "vue-router";

export interface MenuViewAction {
  text: string;
  icon?: string;
  color?: string;
  disabled?: boolean;
  className?: string;
}

export default defineComponent({
  name: "MenuView",
  props: {
    // 数据源
    actions: {
      type: Array as PropType<MenuViewAction[]>,
      default: () => []
    }
  },
  components: {},
  setup() {
    return {};
  }
});
</script>

<style lang='less' scoped>
.menu-view__wrapper {
  .menu-view__action {
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 160px;
    height: 57px;
    padding-left: 25px;
    font-size: 16px;
    line-height: 22px;
    cursor: pointer;

    &.menu-view__action--with-icon .menu-view__action-text {
      justify-content: flex-start;
    }

    .menu-view__action-text {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      height: 100%;
      position: relative;

      &.van-hairline--bottom {
        &::after {
          border-color: #5d5d5c;
        }
      }
    }

    .menu-view__action-icon {
      margin-right: 9px;
    }
  }
}
</style>
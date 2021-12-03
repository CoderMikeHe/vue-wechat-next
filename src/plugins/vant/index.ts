
import { App } from 'vue'

import {
  Button, 
  Tabbar,
  TabbarItem,
  NavBar,
  // IndexBar,
  // IndexAnchor,
  Cell,
  Icon,
  SwipeCell,
  ActionSheet,
  Switch,
  Popover,
  PullRefresh,
  Toast,
  Swipe,
  SwipeItem
} from 'vant';

const components = [
  Button,
  Tabbar,
  TabbarItem,
  NavBar,
  // IndexBar, 
  // IndexAnchor,
  Cell,
  Icon,
  SwipeCell,
  ActionSheet,
  Switch,
  Popover,
  PullRefresh,
  Toast,
  Swipe,
  SwipeItem
]

// config vant
export function setupVant(app: App<Element>){
  // https://youzan.github.io/vant/#/zh-CN/advanced-usage
  components.forEach((component) => {
    app.component(component.name, component);
  });
}
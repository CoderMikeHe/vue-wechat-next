// 注册全局组件
import { App } from 'vue';
// components
import SvgIcon from './svg-icon/SvgIcon.vue';

import './index-anchor/index.less'
import IndexAnchor from './index-anchor/IndexAnchor';

import './index-bar/index.less'
import IndexBar from './index-bar/IndexBar';


const components = [SvgIcon, IndexAnchor, IndexBar];

export function registerGlobalComponent(app: App<Element>) {
  components.forEach((component: any) => {
    app.component(component.name || component.displayName, component);
  });
}

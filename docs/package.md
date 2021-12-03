## package
记录此项目安装的所有插件，以及使用用途。

### vue-router@4
- Vue3的路由导航
- [使用说明](https://next.router.vuejs.org/)
- 安装：`yarn add vue-router@4`

### vant@next
- 移动端组件库
- [使用说明](https://youzan.github.io/vant/#/zh-CN/home)
- 安装：`yarn add vant@next`

### normalize.css
- css样式初始化
- [使用说明](https://github.com/necolas/normalize.css)
- 安装：`yarn add normalize.css`

### pinyin
- `通讯录`模块转换中文字符为拼音。可以用于汉字注音、排序、检索。
- [使用说明](https://github.com/hotoo/pinyin)
- 安装: `yarn add pinyin`。

### @types/pinyin
- 为`pinyin`库提供 ts 声明文件。
- 安装: `yarn add @types/pinyin --dev`。

### lodash-es
- Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。
- [使用说明](https://www.lodashjs.com/)
- 安装: `yarn add lodash-es`。

### @types/lodash-es
- 为`lodash-es`库提供 ts 声明文件。
- 安装: `yarn add @types/lodash-es --dev`。

-------

### @types/node
- 若`vite.config.ts` 中找不到 `__dirname`，需要引入node；反之，请忽略。
- 安装：`yarn add @types/node --dev`。

### less
- 考虑到 `vant`内部用的也是`less`，以及后期可能会引入`weui`样式库，所以此项目统一使用`less`
- [使用说明](https://less.bootcss.com/)
- 安装：`yarn add less --dev`

### vite-plugin-svg-icons
- 用于生成`svg`雪碧图，以及动态修改`svg`的样式。
- [使用说明](https://github.com/anncwb/vite-plugin-svg-icons)
- 安装：`yarn add vite-plugin-svg-icons --dev`

### @vitejs/plugin-vue-jsx
- 提供 Vue 3 JSX 支持，可能会修改`Vant`中的某个组件。
- [使用说明](https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx)
- 安装：`yarn add @vitejs/plugin-vue-jsx --dev`

### autoprefixer
- 使用基于当前浏览器支持的特性和属性为CSS添加前缀。
- [使用说明](https://github.com/postcss/autoprefixer)
- 安装：`yarn add autoprefixer --dev`

### vite-plugin-style-import
- 按需导入组件库(`Vant`)样式。
- [使用说明](https://github.com/anncwb/vite-plugin-style-import/blob/main/README.zh_CN.md)
- 安装：`yarn add vite-plugin-style-import -D`

### postcss-px-to-viewport
- Viewport 布局
- [配置说明](https://youzan.github.io/vant/v3/#/zh-CN/advanced-usage#viewport-bu-ju)
- [使用说明](https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md)
- 安装：`yarn add -D postcss-px-to-viewport`
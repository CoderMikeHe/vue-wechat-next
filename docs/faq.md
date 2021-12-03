## Q&A
记录在项目开发中遇到的问题和解决方案。

**Q:** `Internal server error: missing semi-colon or unrecognised media features on import`.

**A:** `@import 'normalize.css/normalize.css'` 末尾未加`;`导致，改成`@import 'normalize.css/normalize.css';`即可.

---

**Q:** 使用`path.resolve(__dirname, ".", dir);`找不到`__dirname`.

**A:** 安装`node`,执行`yarn add @types/node --dev`.

---

**Q:** `[Vue Router warn]: <router-view> can no longer be used directly inside <transition> or <keep-alive>`. 
```html
<!-- 这个是vue2.x的写法 -->
<template>
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
</template>
```

**A:** `vue3.x` 写法
```html
<template>
  <router-view v-slot="{ Component }">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
<template>
```
---
**Q:** 在`<svg-icon class="wc-svg-icon"><svg-icon>`设置`.wc-svg-icon{ fill: red}`无效.

```html
<!-- 无效写法 -->
<?xml version="1.0" encoding="UTF-8"?>
<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 52.2 (67145) - http://www.bohemiancoding.com/sketch -->
    <title>icons_filled_contacts</title>
    <desc>Created with Sketch.</desc>
    <g id="icons_filled_contacts" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="icon12" fill="#000000">
            <path d="M1,20 L1,19.3154633 C1,18.6303744 1.49815091,17.8319079 2.11409761,17.5313327 L7.77445076,14.769143 C8.59537712,14.36854 8.78625906,13.4812624 8.19344522,12.7786389 L7.83191269,12.350138 C7.09631763,11.4782852 6.5,9.84949648 6.5,8.70929053 L6.5,6.99958038 C6.5,4.79067313 8.29535615,3 10.5,3 C12.709139,3 14.5,4.79298022 14.5,7.00020747 L14.5,8.71018568 C14.5,9.84929595 13.9009324,11.4828603 13.1680872,12.351573 L12.8065546,12.7801327 C12.2170324,13.4789507 12.4011877,14.3683976 13.225549,14.7705104 L18.8859024,17.5315576 C19.5012015,17.8316925 20,18.6251701 20,19.3154633 L20,20 C20,20.5522847 19.5522847,21 19,21 L2,21 C1.44771525,21 1,20.5522847 1,20 Z M20,14.5 L23,14.5 L23,16 L20,16 L20,14.5 Z M18,11.5 L23,11.5 L23,13 L18,13 L18,11.5 Z M16,8.5 L23,8.5 L23,10 L16,10 L16,8.5 Z" id="Combined-Shape"></path>
        </g>
    </g>
</svg>
```
**A:** 去掉`.svg`文件中的`fill`属性.

```html
<!-- 有效写法 -->
<?xml version="1.0" encoding="UTF-8"?>
<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 52.2 (67145) - http://www.bohemiancoding.com/sketch -->
    <title>icons_filled_contacts</title>
    <desc>Created with Sketch.</desc>
    <g id="icons_filled_contacts" stroke="none" stroke-width="1" fill-rule="evenodd">
        <g id="icon12">
            <path d="M1,20 L1,19.3154633 C1,18.6303744 1.49815091,17.8319079 2.11409761,17.5313327 L7.77445076,14.769143 C8.59537712,14.36854 8.78625906,13.4812624 8.19344522,12.7786389 L7.83191269,12.350138 C7.09631763,11.4782852 6.5,9.84949648 6.5,8.70929053 L6.5,6.99958038 C6.5,4.79067313 8.29535615,3 10.5,3 C12.709139,3 14.5,4.79298022 14.5,7.00020747 L14.5,8.71018568 C14.5,9.84929595 13.9009324,11.4828603 13.1680872,12.351573 L12.8065546,12.7801327 C12.2170324,13.4789507 12.4011877,14.3683976 13.225549,14.7705104 L18.8859024,17.5315576 C19.5012015,17.8316925 20,18.6251701 20,19.3154633 L20,20 C20,20.5522847 19.5522847,21 19,21 L2,21 C1.44771525,21 1,20.5522847 1,20 Z M20,14.5 L23,14.5 L23,16 L20,16 L20,14.5 Z M18,11.5 L23,11.5 L23,13 L18,13 L18,11.5 Z M16,8.5 L23,8.5 L23,10 L16,10 L16,8.5 Z" id="Combined-Shape"></path>
        </g>
    </g>
</svg>
```

**Q:** 引入`Vant`样式 `import 'vant/lib/index.less';` 报错.
```
'~@vant/icons/src/encode-woff2.less' wasn't found. 
```

**A:** 在`vite.config.ts`中的`resolve.alias` 设置 `alias: [{ find: /^~/, replacement: '' }]` 即可.
```ts
export default defineConfig({
  resolve: {
    alias: [
      { find: /^~/, replacement: '' }
    ]
  }
})
```
- [Vant 在vite2下如何引入库中的less及定制主题](https://github.com/youzan/vant/issues/7986)

---

**Q:** 定制`Vant`的主题(PS: 修改`vant`样式中`less`变量).

**A:** 配置`vite.config.ts`中的`css.preprocessorOptions`，详见`vite.config.ts`.
```ts
export default defineConfig({
  resolve: {
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 直接覆盖变量
          'tabbar-height': '100px',
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          // hack: `true; @import "./src/styles/variable.less";`,
        },
      }
    }
  }
})
```
- [Vant 在vite2下如何引入库中的less及定制主题](https://github.com/youzan/vant/issues/7986)

---

**Q:** `Cannot find name 'process'. Do you need to install type definitions for node? Try "npm i @types/node" and then add "node" to the types field in your tsconfig.ts(2591)` 警告

**A:** 安装`node`,执行`yarn add @types/node --dev`； 并在 `tsconfig.json` 中设置 `"types": ["vite/client", "node"]`.
- [TypeScript getting error TS2304: cannot find name ' require'](https://stackoverflow.com/questions/31173738/typescript-getting-error-ts2304-cannot-find-name-require)

---

**Q:** `[@vue/compiler-sfc] the >>> and /deep/ combinators have been deprecated. Use :deep() instead.`

**A:** 使用 `:deep()` 来代替 `>>> or /deep/`
- [vue3.0 深度选择器＞＞＞ 和 /deep/ 和 ::v-deep 被弃用‘the ＞＞＞ and /deep/ combinators have been deprecated‘](https://blog.csdn.net/wangyile4399/article/details/115402411)

--- 

**Q:** `Could not find a declaration file for module 'pinyin'. '/Users/admin/Desktop/CoderMikeHe/vue-wechat-next/node_modules/pinyin/lib/index.js' implicitly has an 'any' type. Try "npm install @types/pinyin" if it exists or add a new declaration (.d.ts) file containing "declare module 'pinyin';"`

**A:** 第三方库缺少声明文件。①`yarn add @types/pinyin --dev`；②⚠️⚠️⚠️请务必重启IDE
- [TypeSearch](https://www.typescriptlang.org/dt/search?search=) 
- [TypeScript 引入第三方包，报无法找到模块错误](https://www.jianshu.com/p/35742227738e)
- ⚠️⚠️⚠️请务必重启`IDE`
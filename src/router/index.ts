import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";


// 地址路由
// ⚠️ 路由配置参照模板写法，注意细节，注意大小写
// {
//   path: '/partner-search',
//   name: 'PartnerSearch',
//   component: () => import('@/components/Partner/Search/PartnerSearch.vue'),
//   meta: { title: '伙伴搜索', keepAlive: true }
// },
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: 'Root',
    redirect: "/splash"
  },
  {
    path: '/splash',
    name: "Splash",
    component: () => import('pages/splash/Splash.vue'),
    meta: { title: '闪屏页', keepAlive: false }
  },
  {
    path: '/homepage',
    name: "Homepage",
    component: () => import('pages/homepage/Homepage.vue'),
    meta: { title: '主页', keepAlive: false }
  },
  {
    path: '/setting',
    name: "Setting",
    component: () => import('pages/profile/Setting.vue'),
    meta: { title: '设置', keepAlive: false }
  },
  {
    path: '/general',
    name: "General",
    component: () => import('pages/profile/General.vue'),
    meta: { title: '通用', keepAlive: false }
  },
  {
    path: '/discover-manager',
    name: "DiscoverManager",
    component: () => import('pages/profile/DiscoverManager.vue'),
    meta: { title: '发现页管理', keepAlive: false }
  },
  
  {
    path: '/test',
    name: "Test",
    component: () => import('pages/homepage/Test.vue'),
    meta: { title: '伙伴搜索0', keepAlive: false }
  },
  {
    path: '/test1',
    name: "Test1",
    component: () => import('pages/homepage/Test1.vue'),
    meta: { title: '伙伴搜索1', keepAlive: false }
  },
  {
    path: '/moments',
    name: "Moments",
    component: () => import('pages/discover/Moments.vue'),
    meta: { title: '朋友圈', keepAlive: false }
  },
  {
    path: '/moments',
    name: "Moments",
    component: () => import('pages/discover/Moments.vue'),
    meta: { title: '朋友圈', keepAlive: false }
  },

  {
    path: '/add-friends',
    name: "AddFriends",
    component: () => import('pages/contact/AddFriends.vue'),
    meta: { title: '添加朋友', keepAlive: false }
  },
]

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router
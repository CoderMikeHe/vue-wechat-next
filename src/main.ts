import { createApp } from 'vue'
import App from './App.vue'

import router from './router';

import { setupVant } from './plugins/vant';

// Register icon Sprite
import 'vite-plugin-svg-icons/register';

import { registerGlobalComponent } from './components/registerGlobalComponent';

// 公用全局样式
import 'styles/wechat.less'
// 修改 Vant 部分全局样式
import 'styles/vant.less'


const app = createApp(App)

app.use(router)

// Configure Vant components
setupVant(app)

// Register global components
registerGlobalComponent(app);

app.mount('#app')

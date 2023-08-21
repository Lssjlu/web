import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'


// 创建实例
const app = createApp(App)

app.use(createPinia().use(piniaPersist))
app.use(router)
// 将实例挂载到DOM
app.mount('#app')



for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
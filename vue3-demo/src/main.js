import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import axios from "axios";

async function init() {
    await getServerConfig()
}

const app = createApp(App)

app.use(init)
export const globals = app.config.globalProperties

app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
})
app.mount('#app')

function getServerConfig() {
    return new Promise((resolve, reject) => {
        axios.get('/config.json').then(res => {
            app.config.globalProperties.$config = res.data;
            resolve();
        }).catch(error => {
            console.log(error);
            reject()
        })
    })
}

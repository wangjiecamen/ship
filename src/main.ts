import { createApp } from 'vue'
import './styles/index.less'
import App from './App.vue'
import router from './router'
import { initHtmlFontSize } from '@/utils/flexible.ts'
import store from './store'
const app = createApp(App)
app.use(router).use(store)
app.mount('#app')

initHtmlFontSize()

// 引入的不再是vue构造函数( new Vue() )，而是名为createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

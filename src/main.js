import './assets/style/reset.css'
import {timers} from './store/store.js';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia();
const app = createApp(App)
app.mount("#app")
app.use(pinia)

const timer = timers
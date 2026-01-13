import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import HighchartsVue from 'highcharts-vue'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
    .use(HighchartsVue)
    .mount('#app')
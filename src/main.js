import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import '@/assets/css/style.css'
import '@/assets/css/device.css'
import 'muse-ui/dist/muse-ui.css'
import MuseUI from 'muse-ui'
import vSelect from "vue-select"
import "vue-select/dist/vue-select.css";

Vue.component("v-select", vSelect);
Vue.use(MuseUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

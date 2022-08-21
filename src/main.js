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
import Toast from 'muse-ui-toast';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faUserSecret,  
  faBackwardStep,
  faForwardStep,
  faPlay,
  faPause,
  faBars,
  faEllipsisV,
  faXmark,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUserSecret, 
  faBackwardStep, 
  faForwardStep, 
  faPlay, 
  faPause, 
  faBars, 
  faEllipsisV, 
  faXmark,
  faPlus
)


Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component("v-select", vSelect);
Vue.use(MuseUI)
Vue.use(Toast, {
  position: 'bottom',               
  time: 2000,                       
  closeIcon: '',              
  close: true,                      
  successIcon: '',     
  infoIcon: 'info',                 
  warningIcon: 'priority_high',    
  errorIcon: 'warning'
});
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

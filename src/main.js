import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import App from './components/todo-app/App'
//import Test from './components/test/Test'
//import TestWatch from './components/test/TestWatch'
//import AppParent from "@/components/api-composition/AppParent";
import VueLogger from 'vuejs-logger'

Vue.config.productionTip = false

const options = {
  isEnabled: true,
  logLevel : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : false,
  separator: '|',
  showConsoleColors: true
};

Vue.use(VueCompositionApi);
Vue.use(VueLogger, options);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});

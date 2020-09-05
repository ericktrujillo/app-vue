import Vue from 'vue'
//import App from './App'
//import Test from './components/test/Test'
import TestWatch from './components/test/TestWatch'
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

Vue.use(VueLogger, options);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<TestWatch/>',
  components: { TestWatch }
});

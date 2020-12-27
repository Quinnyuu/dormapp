import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'assets/iconfont/iconfont.css'
Vue.config.productionTip = false;
Vue.use(ElementUI)

import { Toast, Tab, Tabs, Overlay, Button, 
  Dialog, Stepper, Picker, Field, Uploader,
  RadioGroup, Radio, DatetimePicker, Popup  } from 'vant';
Vue.prototype.$toast = Toast;
Vue.prototype.$dialog = Dialog;
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Overlay);
Vue.use(Button);
Vue.use(Stepper);
Vue.use(Picker);
Vue.use(Field);
Vue.use(Uploader);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(DatetimePicker);
Vue.use(Popup);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Date.prototype.Format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "H+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
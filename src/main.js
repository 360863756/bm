import 'babel-polyfill';
import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api';
import services from './services';
import constant from './constant';
import './directives'; // 全局指令注册
import './filters'; // 全局过滤器注册
import echarts from 'echarts'; // 导入echarts
import dataV from '@jiaminghi/data-view';
import 'swiper/css/swiper.css';
import EchartsTheme from '@/assets/json/echarts-theme.json'; // 图表主题
// import './icons'; // 全局注册SvgIcon组件，生成svg-sprite
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import Panel from '@/components/Panel/Index.vue';

// FIXME: 开启Mock时，导致文件下载无法打开
process.env.VUE_APP_USE_MOCK === 'true' && require('./mock');
// import './mock';
Vue.config.productionTip = false;
// ElementUI 注册
Vue.use(ElementUI, {
  // size: 'small',
});

Vue.use(dataV);
Vue.prototype.$api = api;
Vue.prototype.$constant = Vue.prototype.$const = constant;
Vue.prototype.$service = services;
echarts.registerTheme('default', EchartsTheme);
Vue.prototype.$echarts = echarts;
Vue.prototype.$BASE_API = process.env.VUE_APP_BASE_API || '';
dayjs.locale('zh-cn');
Vue.prototype.$dayjs = dayjs;
Vue.component(Panel.name, Panel);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

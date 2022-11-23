import Vue from 'vue';
import {
  importAll,
} from '@/utils';
import SvgIcon from '@/components/SvgIcon/Index.vue'; // svg component

// register globally
Vue.component('svg-icon', SvgIcon);

const modulesFiles = require.context('./svg', false, /\.svg$/);
const modules = importAll(modulesFiles);

export default Object.keys(modules);

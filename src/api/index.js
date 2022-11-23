import {
  importAll,
} from '@/utils';
import ChangeCase from 'change-case';

const modulesFiles = require.context('./', true, /\.js$/);
const modules = importAll(modulesFiles, true);

const apis = {};
for (let key in modules) {
  apis[ChangeCase.camelCase(key)] = modules[key];
}
export default apis;

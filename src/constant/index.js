import ChangeCase from 'change-case';
import {
  importAll,
} from '@/utils';

const modulesFiles = require.context('./', true, /\.js/);
const modules = importAll(modulesFiles, true);

const constants = {};
for (let key in modules) {
  constants[ChangeCase.camelCase(key)] = modules[key];
}

export default constants;

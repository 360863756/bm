import {
  importAll,
} from '@/utils';
import ChangeCase from 'change-case';

const modulesFiles = require.context('./', true, /[^index]\.js/);
const modules = importAll(modulesFiles, true);

const services = {};
for (let key in modules) {
  services[ChangeCase.camelCase(key)] = modules[key];
}
export default services;

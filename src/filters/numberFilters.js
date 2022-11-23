import {
  numberFormat as numberFormatUtil,
} from '@/utils';

// 数字格式化
export const numberFormat = {
  name: 'numberFormat',
  handler(number, formatter) {
    return numberFormatUtil(number, formatter);
  }
};

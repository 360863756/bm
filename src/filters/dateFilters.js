import {
  foretime as foretimeUtil,
  dateFormat as dateFormatUtil,
} from '@/utils';

export const foretime = {
  name: 'foretime',
  handler: (date, ...args) => {
    return foretimeUtil(date, ...args);
  }
};

export const dateFormat = {
  name: 'dateFormat',
  handler: (date, formatter) => {
    return dateFormatUtil(date, formatter);
  }
};

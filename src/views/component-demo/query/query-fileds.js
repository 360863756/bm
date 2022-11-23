import throttle from 'lodash/throttle';
import GenderSelect from './GenderSelect.vue';

export const userQueryFields = [
  { // 输入框
    prop: 'input',
    label: '输入框',
    // type: 'input', // 默认为input类型
    placeholder: 'ElInput',
  },
  { // 自动补全
    prop: 'autocomplete',
    label: '自动补全',
    type: 'autocomplete',
    placeholder: 'ElAutocomplete',
    clearable: true,
    fetchSuggestions: throttle((keyword, cb) => { // 应该使用防抖，防止大量请求
      const options = Array(5).fill(undefined).map((v, index) => ({ value: `${keyword}-${index}` }));
      return cb(options);
    }, 300),
  },
  { // 下拉选择
    prop: 'select',
    label: '下拉选择',
    type: 'select',
    placeholder: 'ElSelect',
    clearable: true,
    async options(model) { // 异步选项，返回一个解析为Array的Promise
      // promise 模拟接口调用
      console.log('[Query]: 获取异步选项示例', model);
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve([
            { label: '四川', value: 'sichuan' },
            { label: '广东', value: 'guangdong' },
          ]);
        }, 500);
      });
      const options = await promise;
      return options;
    },
    // options: [ // 同步选项
    //   { label: '四川', value: 'sichuan' },
    // ],
  },
  {
    prop: 'date',
    label: '日期选择',
    type: 'date',
    placeholder: 'ElDatepicker',
    valueFormat: 'timestamp',
  },
  { // 时间范围
    prop: 'daterange',
    label: '时间范围',
    type: 'daterange',
    valueFormat: 'timestamp',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    clearable: true,
  },
  { // 自定义输入
    prop: 'gender',
    label: '性别',
    type: 'custom', // 必须传入component属性
    component: GenderSelect,
    allowUnknown: true, // 组件自定义属性
  },
];

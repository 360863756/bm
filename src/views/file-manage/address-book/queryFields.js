import WordList from '../components/WordList/Index';
export const refQueryFields = [
  {
    prop: 'xm',
    type: 'input',
    clearable: true,
    placeholder: '关键字搜索'
  },
  {
    prop: 'xmszm',
    type: 'custom',
    component: WordList
  }
];

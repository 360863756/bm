import { getPrisonData } from '@/api/app';
export const refQueryFields = [
  {
    label: '监区:',
    prop: 'jqdm',
    width: '250',
    clearable: true,
    type: 'select',
    placeholder: '全部',
    options: async() => {
      let { data } = await getPrisonData();
      let arr = data['areaList_data'].map(i => {
        i.value = i.areacode;
        i.label = i.arecname;
        delete i.areacode;
        delete i.arecname;
        return i;
      });
      return arr;
    }
  },
  {
    prop: 'zfbh',
    type: 'input',
    clearable: true,
    placeholder: '关键字搜索'
  }
];

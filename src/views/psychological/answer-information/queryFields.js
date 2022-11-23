import { getPrisonData } from '@/api/app';
import { getNumberData } from '@/api/psychological';
export const refQueryFields = [
  {
    label: '监区:',
    prop: 'jqdm',
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
    label: '测评量表:',
    prop: 'cplb',
    clearable: true,
    type: 'select',
    placeholder: '全部',
    options: async() => {
      let { data } = await getNumberData();
      let arr = data['fxpg_xlcp_lbbm_data'].map(i => {
        i.label = i.name;
        delete i.name;
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

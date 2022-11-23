// 危险等级
export const ASSESSMENT_TYPE = {
  HIGHRISK: {
    label: '静态',
    value: 1,
    color: ''
  },
  OVERTIME: {
    label: '动态',
    value: 0,
    color: ''
  },
  MEASUREMENT: {
    label: '测评',
    value: 2,
    color: ''
  }
};
export const ASSESSMENT_TYPES = Object.values(ASSESSMENT_TYPE);

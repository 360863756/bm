import CSSVariables from '@/style/var.scss';
// 危险等级
export const COLOR_GRADE = {
  HIGH: {
    label: '高',
    className: 'high',
    value: 1,
    color: CSSVariables.colorGradeHigh,
  },
  CENTER: {
    label: '中',
    className: 'center',
    value: 2,
    color: CSSVariables.colorGradeCenter,
  },
  LOW: {
    label: '低',
    className: 'low',
    value: 3,
    color: CSSVariables.colorGradeLow,
  }
};
export const COLOR_GRADES = Object.values(COLOR_GRADE);

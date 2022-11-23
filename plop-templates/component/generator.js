const fs = require('fs');
const path = require('path');
const ChangeCase = require('change-case');
const {
  VUE_OPTIONS
} = require('../utils');

const prompts = [
  {
    name: 'name',
    type: 'input',
    message: '请输入组件名：',
    validate(answer) {
      const name = ChangeCase.pascalCase(answer, '', false);
      const componentPath = path.join(__dirname, '../../src/components', name);
      try {
        fs.accessSync(componentPath, fs.constants.F_OK);
        return `组件${name}已经存在`;
      } catch (error) {
        return true;
      }
    }
  },
  {
    name: 'blocks',
    type: 'checkbox',
    message: 'Blocks：',
    choices: [
      {
        name: '<template>',
        value: 'template',
        checked: true,
      },
      {
        name: '<script>',
        value: 'script',
        checked: true,
      },
      {
        name: '<style>',
        value: 'style',
        checked: true,
      }
    ],
    validate(answer) {
      if (!answer.includes('script') && !answer.includes('template')) {
        return '组件至少需要template块或者script块';
      }
      return true;
    },
  },
  {
    name: 'options',
    type: 'checkbox',
    message: '组件选项：',
    choices: VUE_OPTIONS.map(option => ({
      name: option.name,
      checked: option.defaultChecked,
    })),
  }
];
const actions = data => {
  const {
    name,
    blocks,
    options,
  } = data;
  // 不合并数字
  const componentName = ChangeCase.pascalCase(name, '', false);
  const actions = [];

  const mapOptions = () => {
    const res = {};
    VUE_OPTIONS.forEach(({ name }) => {
      res[name] = options.includes(name);
    });
    return res;
  };

  actions.push({
    type: 'add',
    path: `src/components/${componentName}/Index.vue`,
    templateFile: 'plop-templates/component/Index.hbs',
    data: {
      name: componentName,
      template: blocks.includes('template'),
      script: blocks.includes('script'),
      style: blocks.includes('style'),
      mapOptions: mapOptions(),
    }
  });
  return actions;
};
module.exports = {
  description: '生成一个组件',
  prompts,
  actions,
};

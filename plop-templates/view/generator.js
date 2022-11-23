const fs = require('fs');
const path = require('path');
const ChangeCase = require('change-case');

const {
  VUE_OPTIONS,
} = require('../utils');

const src = path.resolve(__dirname, '../../src');

const normalizeViewPath = viewPath => {
  return viewPath
    .replace(/\/$/, '')
    .replace(/^\//, '')
    .replace(/\/+/g, '/')
    .split('/')
    .map(item => ChangeCase.kebabCase(item, '', false))
    .join('/');
};

const getPathMap = viewPath => {
  const name = viewPath.split('/').pop();
  const map = {
    view: path.join(src, `views/${viewPath}`),
    api: path.join(src, `api/${name}.js`),
    mock: path.join(src, `mock/${name}.js`),
    constant: path.join(src, `constant/${name}.js`),
    store: path.join(src, `store/modules/${name}.js`),
  };
  return map;
};

const prompts = [
  {
    name: 'name',
    type: 'input',
    message: '请输入页面路径：',
    validate(answer) {
      const normalizedPath = normalizeViewPath(answer);
      const pathMap = getPathMap(normalizedPath);
      try {
        fs.accessSync(pathMap.view, fs.constants.F_OK);
        return `${pathMap.view}已存在`;
      } catch (error) {}
      return true;
    },
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
    choices: VUE_OPTIONS.map(option => {
      const {
        name,
        defaultChecked,
      } = option || {};
      const overrideDefaultChecked = {
        props: false,
      };
      return {
        name: name,
        checked: overrideDefaultChecked[name] !== undefined
          ? overrideDefaultChecked[name]
          : defaultChecked,
      };
    }),
  },
  {
    name: 'shouldCreateApi',
    type: 'confirm',
    message: '创建api/mock文件？',
    default: true,
  },
  {
    name: 'shouldCreateStore',
    type: 'confirm',
    message: '创建状态管理文件？',
    default: false,
  },
  {
    name: 'shouldCreateConstant',
    type: 'confirm',
    message: '创建常量管理文件？',
    default: false,
  },
];

const actions = data => {
  const {
    name,
    blocks,
    options,
    shouldCreateApi,
    shouldCreateStore,
    shouldCreateConstant,
  } = data;
  const normalizedPath = normalizeViewPath(name);
  const pathMap = getPathMap(normalizedPath);
  const viewName = normalizedPath.split('/').pop();

  const mapOptions = () => {
    const res = {};
    VUE_OPTIONS.forEach(({ name }) => {
      res[name] = options.includes(name);
    });
    return res;
  };

  const actions = [
    {
      type: 'add',
      path: path.join(pathMap.view, 'Index.vue'),
      templateFile: 'plop-templates/view/Index.hbs',
      data: {
        viewName: ChangeCase.pascalCase(viewName, '', false),
        template: blocks.includes('template'),
        script: blocks.includes('script'),
        style: blocks.includes('style'),
        mapOptions: mapOptions(),
      }
    },
  ];
  if (shouldCreateApi) {
    try {
      fs.accessSync(pathMap.api, fs.constants.F_OK);
    } catch (error) {
      actions.push({
        type: 'add',
        path: pathMap.api,
        templateFile: 'plop-templates/view/api.hbs',
        data: {
          viewName,
        },
      });
    }
    try {
      fs.accessSync(pathMap.mock, fs.constants.F_OK);
    } catch (error) {
      actions.push({
        type: 'add',
        path: pathMap.mock,
        templateFile: 'plop-templates/view/mock.hbs',
        data: {
          viewName,
        },
      });
    }
  }
  if (shouldCreateStore) {
    try {
      fs.accessSync(pathMap.store, fs.constants.F_OK);
    } catch (error) {
      actions.push({
        type: 'add',
        path: pathMap.store,
        templateFile: 'plop-templates/view/store.hbs',
        data: {
          viewName,
        },
      });
    }
  }
  if (shouldCreateConstant) {
    try {
      fs.accessSync(pathMap.constant, fs.constants.F_OK);
    } catch (error) {
      actions.push({
        type: 'add',
        path: pathMap.constant,
        templateFile: 'plop-templates/view/constant.hbs',
      });
    }
  }
  return actions;
};

module.exports = {
  description: '生成一个页面',
  prompts,
  actions,
};

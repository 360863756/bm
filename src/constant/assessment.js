export const ASSESSMENT = {
  static: {
    label: '静态评估',
    path: '/assessment/static-evaluation',
    detailPath: {
      onePage: {
        name: '评估详情',
        path: '/assessment/detail/static-evaluation/home',
      },
      twoPage: {
        name: '管控措施',
        path: '/assessment/detail/static-evaluation/control',
      },
      threePage: {
        name: '管控措施',
        path: '/assessment/detail/static-evaluation/information',
      },
    },
    value: 1
  },
  dynamic: {
    label: '动态评估',
    path: '/assessment/dynamic-evaluation',
    detailPath: {
      onePage: {
        name: '评估详情',
        path: '/assessment/detail/dynamic-evaluation/home',
      },
      twoPage: {
        name: '管控措施',
        path: '/assessment/detail/dynamic-evaluation/control',
      },
      threePage: {
        name: '管控措施',
        path: '/assessment/detail/dynamic-evaluation/information',
      },
    },
    value: 2
  },
  psychological: {
    label: '心理评估',
    path: '/assessment/psychological-assessment',
    detailPath: {
      onePage: {
        name: '入监评估',
        path: '/assessment/detail/psychological-assessment/home',
      },
      twoPage: {
        name: '中期评估',
        path: '/assessment/detail/psychological-assessment/servePrison',
      },
      threePage: {
        name: '出监评估',
        path: '/assessment/detail/psychological-assessment/outPrison',
      },
    },
    value: 3
  },
  measurement: {
    label: '测评',
    path: '/enter-information/login'
  }
};

export const ASSESSMENTS = Object.values(ASSESSMENT);

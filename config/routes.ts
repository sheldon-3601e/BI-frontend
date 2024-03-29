export default [
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { path: '/welcome', icon: 'smile', component: './Welcome', name: '首页' },
  {
    path: '/chart',
    icon: 'unorderedListOutlined',
    name: '图表',
    routes: [
      { path: '/chart', redirect: '/chart/list' },
      { path: '/chart/add', component: './User/Chart/AddChart', name: '智能分析（同步）' },
      {
        path: '/chart/add_async',
        component: './User/Chart/AddAsyncChart',
        name: '智能分析（异步）',
      },
      { path: '/chart/list', component: './User/Chart/ListChart', name: '图表管理' },
      {
        path: '/chart/edit/:id',
        component: './User/Chart/EditChart',
        name: '图表编辑',
        hideInMenu: true,
      },
      {
        path: '/chart/show/:id',
        component: './User/Chart/ShowInfoChart',
        name: '图表信息',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/admin',
    icon: 'userOutlined',
    name: '管理页',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { icon: 'table', path: '/admin/user', component: './Admin/User', name: '用户管理' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];

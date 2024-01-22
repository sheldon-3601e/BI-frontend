export default [
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { path: '/welcome', icon: 'smile', component: './Welcome', name: "欢迎页" },
  {
    path: '/chart',
    icon: 'crown',
    name: "图表",
    routes: [
      { path: '/chart', redirect: '/chart/add' },
      { icon: 'table', path: '/chart/add', component: './User/Chart/Add', name: "智能分析" },
    ],
  },
  {
    path: '/admin',
    icon: 'crown',
    name: "管理页",
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { icon: 'table', path: '/admin/user', component: './Admin/User', name: "用户管理" },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];

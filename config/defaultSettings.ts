import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * 默认设置
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#00668c',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '洞见智能BI平台',
  logo:'/bi_logo.svg',
  pwa: true,
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
    bgLayout: '#fffefb',
    sider: {
      colorMenuBackground: '#f5f4f1',
      colorTextMenu: '#1d1c1c'
    },
  },
};

export default Settings;

import { listMyChartByPageUsingPost } from '@/services/backend/chartController';
import {
  ClockCircleTwoTone,
  LikeOutlined,
  MessageOutlined,
  PlayCircleTwoTone,
  StarOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Card, FloatButton, List, message, Result, Space, Switch } from 'antd';
import Search from 'antd/es/input/Search';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'umi';
import {values} from "lodash";

/**
 * 图表管理页面
 *
 * @constructor
 */

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

// 图表状态枚举
const ChartStatusEnum = {
  WAIT: 0,
  WORKING: 1,
  SUCCEED: 2,
  FAILED: -1,
};

const UserAdminPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 解析查询参数的统一函数
  const getLocationParams = (key: string) => {
    // 更新路由
    const params = location.search;
    // 使用 URLSearchParams 解析查询字符串
    const paramsMap = new URLSearchParams(params);
    return paramsMap.get(key);
  };

  // 初始化查询参数
  const initSearchParams = {
    current: (getLocationParams('current') as unknown as number) ?? 1,
    name: getLocationParams('name') ?? '',
    pageSize: 4,
    sortField: 'createTime',
    sortOrder: 'desc',
  };

  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({ ...initSearchParams });
  const [total, setTotal] = useState<number>(0);
  const [chartDataList, setChartDataList] = useState<API.Chart[]>();
  const [loading, setLoading] = useState(false);
  const [authLoadData, setAuthLoadData] = useState(false);

  // 解析查询参数的统一函数
  const updateSearchParams = (newSearchParams: Partial<API.ChartQueryRequest>) => {
    const mergedParams = { ...searchParams, ...newSearchParams };
    setSearchParams(mergedParams);
    navigate(`/chart/list?current=${mergedParams.current}&name=${mergedParams.name}`);
  };

  // 加载图表数据
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await listMyChartByPageUsingPost(searchParams);
      console.log(res);
      if (res.data) {
        setChartDataList(res.data.records ?? []);
        // @ts-ignore
        setTotal(res.data.total ?? 0);
        if (res.data.records) {
          res.data.records.forEach((data) => {
            const chartOptions = JSON.parse(data.genChart ?? '{}');
            chartOptions.title = undefined;
            data.genChart = JSON.stringify(chartOptions);
          });
        }
      } else {
        message.error('获取图表列表异常');
      }
    } catch (e: any) {
      message.error('获取图表列表异常,' + e.message);
    }
    setLoading(false);
  };

  // 处理搜索
  const handleSearch = (values: any) => {
    const newSearchParams = {
      ...initSearchParams,
      name: values,
      current: 1,
    };

    updateSearchParams(newSearchParams);
  };

  // 处理分页变化
  const handlePageChange = (page: number) => {
    const newSearchParams = {
      ...searchParams,
      current: page,
    };
    updateSearchParams(newSearchParams);
  };

  // 重新获取数据
  const handleClick = async () => {
    await loadData();
    message.success('刷新数据成功');
  };

  useEffect(() => {
    loadData();
  }, [searchParams]);

  useEffect(() => {
    // 如果 autoRefresh 为 true，则每三十秒调用一次 loadData
    let intervalId: NodeJS.Timeout | null = null;

    if (authLoadData) {
      intervalId = setInterval(() => {
        loadData();
      }, 30000);
    }

    // 在组件卸载时清除定时器
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [authLoadData]);

  // 渲染图表状态
  const renderChartStatus = (item: API.Chart) => {
    if (item.status === ChartStatusEnum.WAIT) {
      return (
        <Result
          icon={<PlayCircleTwoTone />}
          title="待生成"
          subTitle="当前服务器繁忙，请您耐心等待..."
        />
      );
    } else if (item.status === ChartStatusEnum.WORKING) {
      return (
        <Result
          icon={<ClockCircleTwoTone />}
          title="生成中"
          subTitle="图表正在生成，请您耐心等待..."
        />
      );
    } else if (item.status === ChartStatusEnum.SUCCEED) {
      return <ReactECharts style={{ width: '100%' }} option={JSON.parse(item.genChart ?? '')} />;
    } else if (item.status === ChartStatusEnum.FAILED) {
      return <Result status="error" title="错误" subTitle="图表生成错误，请您重试" />;
    }
  };

  return (
    <PageContainer
      header={{
        extra: [
          <Card key={1} size="small" bordered={false} style={{ marginBottom: 16 }}>
            <span style={{ marginRight: 16 }}>自动刷新</span>
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              onChange={(values) => setAuthLoadData(values)}
            />
          </Card>
        ],
      }}
    >
      <FloatButton.Group shape="circle" style={{ right: 24 }}>
        <FloatButton icon={<SyncOutlined />} onClick={() => handleClick()} />
        <FloatButton.BackTop visibilityHeight={0} />
      </FloatButton.Group>
      <div>
        <Search
          defaultValue={getLocationParams('name') ?? '请输入要搜索的图表名称'}
          allowClear
          enterButton="搜索"
          size="large"
          loading={loading}
          onSearch={(values) => handleSearch(values)}
        />
      </div>
      <div className="margin-16" />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
          xl: 2,
          xxl: 2,
        }}
        size="large"
        loading={loading}
        pagination={{
          onChange: handlePageChange,
          current: searchParams.current,
          pageSize: searchParams.pageSize,
          total: total,
        }}
        dataSource={chartDataList}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
          >
            <Card
              title={item.name}
              extra={
                <Button href={`/chart/list/${item.id}`} type={'primary'}>
                  查看数据
                </Button>
              }
            >
              <List.Item.Meta description={item.chartType} />
              <p>{'分析目标：' + item.goal}</p>
              <div className="margin-16" />
              {renderChartStatus(item)}
            </Card>
            <div className="margin-16" />
          </List.Item>
        )}
      />
    </PageContainer>
  );
};
export default UserAdminPage;

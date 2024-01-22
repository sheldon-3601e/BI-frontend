import { listMyChartByPageUsingPost } from '@/services/backend/chartController';
import {
  ClockCircleTwoTone,
  LikeOutlined,
  MessageOutlined,
  PlayCircleTwoTone,
  StarOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Card, List, message, Result, Space } from 'antd';
import Search from 'antd/es/input/Search';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

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

const ChartStatusEnum = {
  WAIT: 0,
  WORKING: 1,
  SUCCEED: 2,
  FAILED: -1,
};

const UserAdminPage: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 4,
    sortField: 'createTime',
    sortOrder: 'desc',
  };

  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({ ...initSearchParams });
  const [total, setTotal] = useState<number>(0);
  const [chartDataList, setChartDataList] = useState<API.Chart[]>();
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    <PageContainer>
      <div>
        <Search
          placeholder="请输入图表名称"
          allowClear
          enterButton="搜索"
          size="large"
          loading={loading}
          onSearch={(values) => {
            setSearchParams({
              ...initSearchParams,
              name: values,
            });
          }}
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
          onChange: (page) => {
            setSearchParams({
              ...searchParams,
              current: page,
            });
          },
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
              <>
                {item.status === ChartStatusEnum.WAIT && (
                  <Result
                    icon={<PlayCircleTwoTone />}
                    title="待生成"
                    subTitle="当前服务器繁忙，请您耐心等待..."
                  ></Result>
                )}
                {item.status === ChartStatusEnum.WORKING && (
                  <Result
                    icon={<ClockCircleTwoTone />}
                    title="生成中"
                    subTitle="图表正在生成，请您耐心等待..."
                  ></Result>
                )}
                {item.status === ChartStatusEnum.SUCCEED && (
                  <ReactECharts
                    style={{ width: '100%' }}
                    option={JSON.parse(item.genChart ?? '')}
                  />
                )}
                {item.status === ChartStatusEnum.FAILED && (
                  <Result status="error" title="错误" subTitle="图表生成错误，请您重试"></Result>
                )}
              </>
            </Card>
            <div className="margin-16" />
          </List.Item>
        )}
      />
    </PageContainer>
  );
};
export default UserAdminPage;

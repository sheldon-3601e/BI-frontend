import { renderChartStatus } from '@/chartUtils';
import { getChartByIdUsingGet, getChartInfoByIdUsingGet } from '@/services/backend/chartController';
import { PageContainer, ProCard, ProDescriptions, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Col, Divider, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

/**
 * 图表原始数据展示页面
 *
 * @constructor
 */

interface keyListType {
  title: string;
  dataIndex: string;
  key: string;
}

const ShowChart: React.FC = () => {
  const params = useParams();
  const [chartData, setChartData] = useState<API.Chart>();
  const [columns, setColumns] = useState<keyListType[]>([]);
  const [data, setData] = useState<any[]>([]);

  columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  const loadData = async () => {
    // 获取图表数据信息
    const chartDataInfoRes = await getChartInfoByIdUsingGet({
      id: params.id,
    });
    // 获取图表基本信息
    const chartDataRes = await getChartByIdUsingGet({
      id: params.id,
    });
    if (chartDataInfoRes.data && chartDataRes.data) {
      // console.log(chartData)
      setChartData(chartDataRes.data);
      // 处理原始数据
      const list: any[] = chartDataInfoRes.data;
      console.log(list);
      const tableData = list.map((item) => ({
        ...item,
        key: item.id,
      }));
      // console.log(tableData);
      setData(tableData);
      const item = list[0];
      const keysList = Object.keys(item);
      // console.log(keysList);
      const newTemp = keysList.map((key) => ({
        title: key,
        dataIndex: key,
        key: key,
      }));
      setColumns(newTemp);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title={'图表信息'}>
      <ProCard boxShadow>
        <Row gutter={[24, 8]}>
          <Col span={12}>
            <ProDescriptions
              column={2}
              title="基本信息"
              dataSource={chartData}
              extra={
                <Button type="primary" href={`/chart/edit/${chartData?.id}`} key="reload">
                  编辑
                </Button>
              }
            >
              <ProDescriptions.Item dataIndex="name" label="图表名称" valueType="text" />
              <ProDescriptions.Item dataIndex="chartType" label="图表类型" valueType="text" />
              <ProDescriptions.Item dataIndex="goal" label="分析目标" valueType="text" />
              <ProDescriptions.Item dataIndex="createTime" label="创建时间" valueType="dateTime" />
              {chartData?.status === 2 ? (
                <ProDescriptions.Item dataIndex="genResult" label="分析结论" valueType="textarea" />
              ) : (
                <ProDescriptions.Item
                  dataIndex="execMessage"
                  label="失败原因"
                  valueType="textarea"
                />
              )}
            </ProDescriptions>
          </Col>
          <Col span={12}>{chartData && renderChartStatus(chartData)}</Col>
        </Row>
        <Divider type={'horizontal'}>原始数据</Divider>
        <ProTable columns={columns} dataSource={data} style={{ marginTop: 24 }} />
      </ProCard>
    </PageContainer>
  );
};
export default ShowChart;

import {
  genUpdateChartByAiAsyncUsingPost,
  getChartByIdUsingGet,
} from '@/services/backend/chartController';
import { UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
  Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { history, useNavigate } from 'umi';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ChartAdd: React.FC = () => {
  const [chartData, setChartData] = useState<API.Chart>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const loadData = async () => {
    const res = await getChartByIdUsingGet({
      id: params.id,
    });
    if (res.data) {
      setChartData({ ...res.data });
    } else {
      message.error('数据加载失败');
    }
  };

  /**
   * 提交分析数据
   * @param values
   */
  const onFinish = async (values: any) => {
    // 避免重复提交
    if (submitLoading) {
      return;
    }

    setSubmitLoading(true);
    const { name, goal, chartType, file } = values;
    const chartId = params.id;
    const genChatParams = {
      chartId,
      name,
      goal,
      chartType,
    };
    try {
      const res = await genUpdateChartByAiAsyncUsingPost(genChatParams, {}, file[0].originFileObj);
      if (res.data) {
        message.success('图表分析任务提交成功，请稍后在图标管理页面查看');
        history.back();
      } else {
        message.error('图表分析任务提交失败，请您重试');
      }
    } catch (error: any) {
      message.error('图表分析失败，' + error.message);
    } finally {
      history.back();
    }
    setSubmitLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer key={chartData?.id}>
      <Row gutter={24}>
        <Col span={12}>
          <Card title={'数据输入'}>
            <Form name="addChart" onFinish={onFinish} {...formItemLayout} style={{ maxWidth: 600 }}>
              <Form.Item initialValue={chartData?.name} name="name" label="图表名称">
                <Input placeholder="请输入名称" />
              </Form.Item>

              <Form.Item
                name="goal"
                label="分析目标"
                initialValue={chartData?.goal}
                rules={[{ required: true, message: '请输入分析目标!' }]}
              >
                <TextArea placeholder="请输入分析目标..." />
              </Form.Item>

              <Form.Item
                name="chartType"
                label="图表类型"
                initialValue={chartData?.chartType}
                hasFeedback
                rules={[{ required: true, message: '请选择图表类型!' }]}
              >
                <Select
                  options={[
                    { value: '柱状图', label: '柱状图' },
                    { value: '折线图', label: '折线图' },
                    { value: '饼图', label: '饼图' },
                    { value: '雷达图', label: '雷达图' },
                  ]}
                  placeholder="请选择图表类型"
                />
              </Form.Item>

              <Form.Item
                name="file"
                label="分析数据"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: '请上传分析数据!' }]}
              >
                <Upload name="logo" maxCount={1}>
                  <Button icon={<UploadOutlined />}>上传文件</Button>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitLoading}
                    disabled={submitLoading}
                  >
                    分析
                  </Button>
                  <Button htmlType="reset">重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={'可视化图表'}>
            <Spin spinning={submitLoading}>
              {chartData?.genChart ? (
                <ReactECharts option={JSON.parse(chartData.genChart)} />
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </Spin>
          </Card>
        </Col>
      </Row>
      <Divider></Divider>
      <Card title={'数据结论'}>
        {chartData?.genResult ?? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </Card>
    </PageContainer>
  );
};
export default ChartAdd;

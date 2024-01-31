import { genChartByAiUsingPost } from '@/services/backend/chartController';
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
import React, { useState } from 'react';

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
  const [chartData, setChartData] = useState<API.BiResponse>();
  const [options, setOptions] = useState<any>();
  const [submitLoading, setSubmitLoading] = useState(false);

  /**
   * 提交分析数据
   * @param values
   */
  const onFinish = async (values: any) => {
    // 避免重复提交
    if (submitLoading) {
      return;
    }
    setChartData(undefined);
    setOptions(undefined);

    setSubmitLoading(true);
    const { name, goal, chartType, file } = values;
    const params = {
      name,
      goal,
      chartType,
    };
    try {
      const res = await genChartByAiUsingPost(params, {}, file[0].originFileObj);
      if (res.data) {
        const chartOptions = JSON.parse(res.data.genChart ?? '');
        // console.log('genChart' + res.data.genChart)
        // console.log('chartOptions:' + chartOptions)
        if (chartOptions) {
          setOptions(chartOptions);
          setChartData(res.data);
          message.success('图表分析成功');
        } else {
          throw new Error('图标代码解析错误');
        }
      } else {
        message.error('图表分析失败');
      }
    } catch (error: any) {
      message.error('图表分析失败，' + error.message);
    }
    setSubmitLoading(false);
  };

  return (
    <div className={'chart-add'}>
      <PageContainer>
        <Row gutter={24}>
          <Col span={12}>
            <Card title={'数据输入'} style={{ backgroundColor: '#f5f4f1' }} hoverable>
              <Form
                name="addChart"
                {...formItemLayout}
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
              >
                <Form.Item name="name" label="图表名称">
                  <Input placeholder="请输入名称" />
                </Form.Item>

                <Form.Item
                  name="goal"
                  label="分析目标"
                  rules={[{ required: true, message: '请输入分析目标!' }]}
                >
                  <TextArea placeholder="请输入分析目标..." />
                </Form.Item>

                <Form.Item
                  name="chartType"
                  label="图表类型"
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
            <Card title={'可视化图表'} style={{ backgroundColor: '#f5f4f1' }} hoverable >
              <Spin spinning={submitLoading}>
                {chartData ? (
                  <ReactECharts option={options} />
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </Spin>
            </Card>

          </Col>
        </Row>
        <Divider></Divider>
        <Card title={'数据结论'} style={{ backgroundColor: '#f5f4f1' }} hoverable>
          <Spin spinning={submitLoading}>
            {chartData?.genResult ?? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          </Spin>
        </Card>
      </PageContainer>
    </div>
  );
};
export default ChartAdd;

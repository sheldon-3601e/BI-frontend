import { genChartByAiAsyncMqUsingPost } from '@/services/backend/chartController';
import { UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Form, Input, message, Select, Space, Upload } from 'antd';
import useForm from 'antd/es/form/hooks/useForm';
import TextArea from 'antd/es/input/TextArea';
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

const ChartAddAsync: React.FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [form] = useForm();

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
    const params = {
      name,
      goal,
      chartType,
    };
    try {
      const res = await genChartByAiAsyncMqUsingPost(params, {}, file[0].originFileObj);
      if (res.data) {
        message.success('图表分析任务提交成功，请稍后在图标管理页面查看');
        form.resetFields();
      } else {
        message.error('图表分析任务提交失败，请您重试');
      }
    } catch (error: any) {
      message.error('图表分析失败，' + error.message);
    }
    setSubmitLoading(false);
  };

  return (
    <PageContainer>
      <div className={'chart-add-async'}>
        <Card>
          <Form
            form={form}
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
          </Form>
        </Card>
      </div>
    </PageContainer>
  );
};
export default ChartAddAsync;

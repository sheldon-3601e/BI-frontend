// 图表状态枚举
import {Result} from "antd";
import {ClockCircleTwoTone, PlayCircleTwoTone} from "@ant-design/icons";
import ReactECharts from "echarts-for-react";
import React from "react";

export const ChartStatusEnum = {
  WAIT: 0,
  WORKING: 1,
  SUCCEED: 2,
  FAILED: -1,
};

export const renderChartStatus = (item: API.Chart) => {
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

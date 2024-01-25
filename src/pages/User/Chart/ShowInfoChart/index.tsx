import { getChartInfoByIdUsingGet } from '@/services/backend/chartController';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { Checkbox, CheckboxOptionType, Divider, Table, TableColumnsType } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

/**
 * 图表原始数据展示页面
 *
 * @constructor
 */

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
];
const defaultCheckedList = columns.map((item) => item.key as string);

const ShowChart: React.FC = () => {
  const params = useParams();
  const [columns, setColumns] = useState([])
  console.log(params);

  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));
  //
  // const newColumns = columns.map((item) => ({
  //   ...item,
  //   hidden: !checkedList.includes(item.key as string),
  // }));

  // 转换函数
  const transformData = (data: any) => {
    return data.map((item: any) => {
      return {
        title: Object.keys(item)[0],
        dataIndex: Object.keys(item)[0], // 使用第一个属性作为dataIndex，这里是"用户"
        key: item.id,
      };
    });
  };

  const loadData = async () => {
    const res = await getChartInfoByIdUsingGet({
      id: params.id,
    });
    console.log(res.data);
    if (res.data) {
      // 调用转换函数
      const transformedData = transformData(res.data);
      setColumns(transformedData);
      // 打印结果
      console.log(transformedData);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer>
      <>
        <Divider>Columns displayed</Divider>
        <Checkbox.Group
          value={checkedList}
          options={options as CheckboxOptionType[]}
          onChange={(value) => {
            setCheckedList(value as string[]);
          }}
        />

        <Table columns={columns} dataSource={data} style={{ marginTop: 24 }} />
      </>
    </PageContainer>
  );
};
export default ShowChart;

import { getChartInfoByIdUsingGet } from '@/services/backend/chartController';
import '@umijs/max';
import { Checkbox, CheckboxOptionType, Divider, Table } from 'antd';
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
  const [columns, setColumns] = useState<keyListType[]>([]);
  const [data, setData] = useState<any[]>([])

  const [checkedList, setCheckedList] = useState<string[]>([]);
  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  const newColumns = columns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key as string),
  }));

  const loadData = async () => {
    const res = await getChartInfoByIdUsingGet({
      id: params.id,
    });
    if (res.data) {
      const list = res.data;
      setData(res.data)
      console.log(list);
      const item = list[0];
      const keysList = Object.keys(item);
      // console.log(keysList);
      const newTemp = keysList.map((key) => ({
        title: key,
        dataIndex: key,
        key: key
      }));
      setColumns(newTemp);
    }
  };

  useEffect(() => {
    const defaultCheckedList = columns.map((item) => item.key as string);
    setCheckedList(defaultCheckedList);
  }, [columns]);


  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Divider>Columns displayed</Divider>
      <Checkbox.Group
        value={checkedList}
        options={options as CheckboxOptionType[]}
        onChange={(value) => {
          setCheckedList(value as string[]);
        }}
      />

      <Table columns={newColumns} dataSource={data} style={{ marginTop: 24 }} />
    </>
  );
};
export default ShowChart;

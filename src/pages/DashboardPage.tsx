import { useState } from 'react';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, Table, Tag } from 'antd';
import {ColumnProps} from "antd/es/table/Column";
import row from './mocks/row';
import table from './mocks/table';

const DashboardPage: React.FC<{}> = () => {
  let data;
  const columnSet = new Set();
  const column: Array<ColumnProps<any>> = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
  ];
  data = table.reduce((acc, plant) => {
    if (plant.plant_id !== 7) {
      return acc;
    }

    let average = {};

    const reduced = plant.resourceGroups.reduce((acc2, resourceGroup) => {
      if (
        ![
          'G_CMO2',
          'G_ATO2',
          'G_UNRO2',
          'G_DSO2',
          'G_VSO2',
          'G_MFO2',
          'G_VAO2',
          'G_OTGRO2',
        ].includes(resourceGroup.resourceGroupId)
      ) {
        return acc2;
      }
      return [
        ...acc2,
        {
          name: resourceGroup.resourceGroupName,
          key: resourceGroup.resourceGroupId,
          ...resourceGroup.dates.reduce((acc3, date) => {
            const start_plan_date: string = date.start_plan_date.split('T')[0];

            columnSet.add(start_plan_date);

            if (date.color >= 0) {
              if (!average.hasOwnProperty(start_plan_date)) {
                // @ts-ignore
                average[start_plan_date] = {
                  percentage: 0,
                  count: 0
                };
              }
              // @ts-ignore
              average[start_plan_date].percentage += date.percentage;
              // @ts-ignore
              average[start_plan_date].count += 1;
            }

            // @ts-ignore
            acc3[start_plan_date] = {
              percentage: date.percentage,
              color: date.color
            };
            return acc3;
          }, {}),
        },
      ];
    }, []);
    return [
      ...acc,
      {
        name: plant.plant_name,
        key: plant.plant_id,
        ...Object.entries(average).reduce((avr, [date, value]) => {
          // @ts-ignore
          const percentage = (value.percentage / value.count);
          // @ts-ignore
          avr[date] = {
            percentage,
            color: percentage > 95 ? 2 : percentage > 80 ? 1 : 0,
          };
          return avr
        }, {})
      },
      ...reduced,
    ];
  }, []);

  const percentageRender = (tag: {color: number, percentage: number}) => {
    if (!tag) {
      return "";
    }
    let color;
    switch(tag.color) {
      case 2:
        color = 'green';
        break;
      case 1:
        color = 'orange';
        break;
      case 0:
        color = 'volcano';
        break;
      case -1:
        color = 'blue';
        break;
      case -2:
        color = 'purple';
        break;
      default:
        color = 'cyan';
    }
    return <Tag color={color} >
      {tag.percentage + ' %'}
    </Tag>
  };

  column.push(
    ...[...columnSet].sort().map((value: string) => ({
      title: value,
      dataIndex: value,
      key: value,
      render: percentageRender,
    }))
  );

  const [isShow, togglePopup] = useState<boolean>(false);

  const handleOk = () => {
    togglePopup(false);
  };

  const handleCancel = () => {
    togglePopup(false);
  };

  return (
    <div>
      <h1>Dashboard Page</h1>
      <Modal
        title="Basic Modal"
        width={1000}
        visible={isShow}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ModalContent />
      </Modal>
      <Table
        dataSource={data}
        columns={column}
        pagination={false}
        scroll={{x:true}}
        onRow={(record, rowIndex) => ({
          onClick: event => {
            togglePopup(true);
          },
        })}
        size='small'
        style={{width: "1000px"}}
      />
    </div>
  );
};

export default DashboardPage;

const ModalContent = () => {
  const data = row.operations;

  const columns = [
    {
      title: 'Operation ID',
      dataIndex: 'operation_id',
      key: 'operation_id',
    },
    {
      title: 'Operation description',
      dataIndex: 'operation_description',
      key: 'operation_description',
    },
    {
      title: 'Start date new',
      dataIndex: 'start_date_new',
      key: 'start_date_new',
    },
    {
      title: 'End date',
      dataIndex: 'end_date',
      key: 'end_date',
    },
    {
      title: 'Production time',
      dataIndex: 'production_time',
      key: 'production_time',
    },
    {
      title: 'Input quantity',
      dataIndex: 'input_quantity',
      key: 'input_quantity',
    },
    {
      title: 'Output quantity',
      dataIndex: 'output_quantity',
      key: 'output_quantity',
    },
    {
      title: 'Scheduling space',
      dataIndex: 'scheduling_space',
      key: 'scheduling_space',
    },
    {
      title: 'Operation code',
      dataIndex: 'operation_code',
      key: 'operation_code',
    },
    {
      title: 'Product ID',
      dataIndex: 'product_id',
      key: 'product_id',
    },
    {
      title: 'Product name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'order_id',
      dataIndex: 'order_id',
      key: 'order_id',
      render: (orderId) => <NavLink to={`/order/${orderId}`}>{orderId}</NavLink>,
    },
  ];

  return (
    <div>
      <div>
        <b>Resource group id: </b>
        {row.resourceGroupId}
      </div>
      <div>
        <b>Start plane date: </b>
        {row.start_plan_date}
      </div>
      <div>
        <b>Available capacity: </b>
        {row.available_capacity}
      </div>
      <div>
        <b>Free capacity: </b>
        {row.free_capacity}
      </div>
      <div>
        <b>Percentage: </b>
        {row.percentage}
      </div>
      <div>
        <b>Color: </b>
        {row.color}
      </div>
      <div>
        <b>Has finite capacity: </b>
        {row.has_finite_capacity}
      </div>
      <br />
      <div style={{ overflowY: 'scroll' }}>
        <Table dataSource={data} columns={columns} />
      </div>
    </div>
  );
};

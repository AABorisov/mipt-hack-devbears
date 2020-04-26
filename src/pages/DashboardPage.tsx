import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, Table, Tag } from 'antd';
import { ColumnProps } from 'antd/es/table/Column';
import row from './mocks/row';
import table from './mocks/table';

const DashboardPage: React.FC<{}> = () => {
  const columnSet = new Set();
  const column: Array<ColumnProps<any>> = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
  ];
  const data = table.reduce((acc, plant) => {
    const average = {};

    const reduced = plant.resourceGroups.reduce((acc2, resourceGroup) => {
      return [
        ...acc2,
        {
          name: resourceGroup.resourceGroupName,
          key: resourceGroup.resourceGroupId,
          ...resourceGroup.dates.reduce((acc3, date) => {
            const start_plan_date: string = date.start_plan_date.split('T')[0];

            columnSet.add(start_plan_date);

            if (date.color >= 0) {
              // @ts-ignore
              if (!average.hasOwnProperty(start_plan_date)) {
                // @ts-ignore
                average[start_plan_date] = {
                  percentage: 0,
                  count: 0,
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
              color: date.color,
              rgId: resourceGroup.resourceGroupId,
              date: start_plan_date
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
          const percentage = Math.round(value.percentage / value.count);
          const color = percentage > 95 ? 2 : percentage > 80 ? 1 : 0;
          // @ts-ignore
          avr[date] = {
            percentage,
            color,
          };
          return avr;
        }, {}),
      },
      ...reduced,
    ];
  }, []);

  const [isShow, togglePopup] = React.useState<boolean>(false);

  const handleOk = () => {
    togglePopup(false);
  };

  const handleCancel = () => {
    togglePopup(false);
  };

  const onCellClick = (rgId: string, date: string) => () => {
    togglePopup(true);
  }

  const percentageRender = (tag: {
    color: number;
    percentage: number
    rgId: string,
    date: string
  }) => {
    if (!tag) {
      return '';
    }
    let color;
    switch (tag.color) {
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
        color = 'default';
        break;
      case -2:
        color = 'purple';
        break;
      default:
        color = 'cyan';
    }
    return <Tag color={color} onClick={onCellClick(tag.rgId, tag.date)}>{`${tag.percentage} %`}</Tag>;
  };

  column.push(
    ...[...columnSet].sort().map((value: string) => ({
      title: value,
      dataIndex: value,
      key: value,
      render: percentageRender
    }))
  );

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
        scroll={{ x: true, y: '60vh' }}
        size="small"
        style={{ width: '1000px', maxHeight: '60vh' }}
      />
    </div>
  );
};

export default DashboardPage;

const ModalContent = () => {
  const data = row.operations;

  const columns: Array<ColumnProps<any>>  = [
    {
      title: 'COLAlloc',
      dataIndex: 'order_id',
      key: 'order_id',
      render: (orderId: string) => <NavLink to={`/order/${orderId}`}>{orderId}</NavLink>,
      fixed: 'left',
    },
    {
      title: 'Operation ID',
      dataIndex: 'operation_id',
      key: 'operation_id',
      fixed: 'left',
    },
    {
      title: 'Operation description',
      dataIndex: 'operation_description',
      key: 'operation_description',
      width: '50px',
    },
    {
      title: 'Start date new',
      dataIndex: 'start_date_new',
      key: 'start_date_new',
      width: '60px',
    },
    {
      title: 'End date',
      dataIndex: 'end_date',
      key: 'end_date',
      width: '60px',
    },
    {
      title: 'Input quantity',
      dataIndex: 'input_quantity',
      key: 'input_quantity',
      width: '60px',
    },
    {
      title: 'Output quantity',
      dataIndex: 'output_quantity',
      key: 'output_quantity',
      width: '60px',
    },
    {
      title: 'Operation code',
      dataIndex: 'operation_code',
      key: 'operation_code',
      width: '60px',
    },
    {
      title: 'Product ID',
      dataIndex: 'product_id',
      key: 'product_id',
      width: '60px',
    },
    {
      title: 'Product name',
      dataIndex: 'product_name',
      key: 'product_name',
      width: '60px',
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
      <div >
        <Table dataSource={data}
               columns={columns}
               size="small"
               pagination={false}
               scroll={{ x: true, y: '60vh' }}
               style={{ maxHeight: '60vh' }}/>
      </div>
    </div>
  );
};

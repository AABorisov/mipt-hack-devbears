import { useState } from 'react';
import * as React from 'react';
import { Modal, Table } from 'antd';
import { NavLink } from 'react-router-dom';
import row from './mocks/row';
import table from './mocks/table';

const DashboardPage: React.FC<{}> = () => {
  let data = [];
  const columnSet = new Set();
  const column = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  data = table.reduce((acc, plant) => {
    if (plant.plant_id !== 7) {
      return acc;
    }
    return [
      ...acc,
      {
        name: plant.plant_name,
        key: plant.plant_id,
      },
      ...plant.resourceGroups.reduce((acc2, resourceGroup) => {
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
              const start_plan_date = date.start_plan_date.split('T')[0];

              columnSet.add(start_plan_date);
              // @ts-ignore
              acc3[start_plan_date] = date.percentage;
              return acc3;
            }, {}),
          },
        ];
      }, []),
    ];
  }, []);

  column.push(
    ...[...columnSet].sort().map((value: string) => ({
      title: value,
      dataIndex: value,
      key: value,
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
        onRow={(record, rowIndex) => ({
          onClick: event => {
            togglePopup(true);
          },
        })}
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

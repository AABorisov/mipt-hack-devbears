import { Table } from 'antd';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import order from './mocks/order';

const Order = () => {
  const columns = [
    {
      title: 'plan_order_id',
      dataIndex: 'plan_order_id',
      key: 'plan_order_id',
    },
    {
      title: 'order_position',
      dataIndex: 'order_position',
      key: 'order_position',
    },
    {
      title: 'product_name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'vid_product',
      dataIndex: 'vid_product',
      key: 'vid_product',
    },
    {
      title: 'quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'stockin_point_id',
      dataIndex: 'stockin_point_id',
      key: 'stockin_point_id',
    },
    {
      title: 'planned_status',
      dataIndex: 'planned_status',
      key: 'planned_status',
    },
    {
      title: 'start_order_process',
      dataIndex: 'start_order_process',
      key: 'start_order_process',
    },
    {
      title: 'finish_order_process',
      dataIndex: 'finish_order_process',
      key: 'finish_order_process',
    },
    {
      title: 'last_process_date',
      dataIndex: 'last_process_date',
      key: 'last_process_date',
    },
    {
      title: 'full_product_id',
      dataIndex: 'full_product_id',
      key: 'full_product_id',
    },
    {
      title: 'routing_id',
      dataIndex: 'routing_id',
      key: 'routing_id',
    },
    {
      title: 'downstream_customer_orders',
      dataIndex: 'downstream_customer_orders',
      key: 'downstream_customer_orders',
    },
  ];

  return (
    <div style={{ margin: '20px 0' }}>
      <div>
        <b>delivery_type: </b>
        {order.delivery_type}
      </div>
      <div>
        <b>has_sales_budget_reservation: </b>
        {order.has_sales_budget_reservation}
      </div>
      <div>
        <b>img_planned_status: </b>
        {order.img_planned_status}
      </div>
      <div>
        <b>latest_desired_delivery_date_new: </b>
        {order.latest_desired_delivery_date_new}
      </div>
      <div>
        <b>max_quantity: </b>
        {order.max_quantity}
      </div>
      <div>
        <b>min_quantity: </b>
        {order.min_quantity}
      </div>
      <div>
        <b>nr_of_active_routing_chain_upstream: </b>
        {order.nr_of_active_routing_chain_upstream}
      </div>
      <div>
        <b>order_id: </b>
        {order.order_id}
      </div>
      <div>
        <b>order_plant_name: </b>
        {order.order_plant_name}
      </div>
      <div>
        <b>quantity: </b>
        {order.quantity}
      </div>
      <div>
        <b>requires_order_combination: </b>
        {order.requires_order_combination}
      </div>
      <div>
        <b>selected_shipping_shop: </b>
        {order.selected_shipping_shop}
      </div>
      <div>
        <b>view_gp: </b>
        {order.view_gp}
      </div>
      <div>
        <b>routing_id: </b>
        {order.routing_id}
      </div>
      <div>
        <b>product_id: </b>
        {order.product_id}
      </div>
      <div>
        <b>product_name: </b>
        {order.product_name}
      </div>
      <div>
        <b>latest_desired_delivery_date_new: </b>
        {order.latest_desired_delivery_date_new}
      </div>
      <div>
        <b>product_specification_id: </b>
        {order.product_specification_id}
      </div>
      <div>
        <b>resource_group_id: </b>
        {order.resource_group_id}
      </div>
      <br />
      <div style={{ width: '1000px', overflowY: 'scroll' }}>
        <Table dataSource={order.plan_orders} columns={columns} size="small"
               pagination={false}
               scroll={{ x: true, y: '60vh' }}
               style={{ width: '1000px', maxHeight: '60vh' }}
        />
      </div>
    </div>
  );
};

export default withRouter(Order);

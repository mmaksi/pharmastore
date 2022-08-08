import { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
dayjs().format();

const getOrderFullDate = (orderISODate) => {
  const ISOString = orderISODate.updatedAt;
  const date = new Date(ISOString);
  const orderDate = date.toISOString().substring(0, 10);
  return orderDate
}

const getOrderHour = (orderISODate) => {
  const ISOString = orderISODate.updatedAt;
  const date = new Date(ISOString);
  const orderHour = date.toLocaleTimeString()
  return orderHour
}

const ReportsTable = ({ deliveredOrders }) => {
  return (
    <>
      <Container className="mt-4">
        <Table bordered={false} borderless={false} responsive="md">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>User Name</th>
              <th>Delivered Date</th>
              <th>Order Total</th>
              <th>Order Items</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {deliveredOrders.map((order, index) => {
              return (
                <Fragment key={order.orderId}>
                  <tr>
                    <td hidden={true}>{order.orderId}</td>
                    <td>{index + 1}</td>
                    <td>{order.user.username}</td>
                    <td>{`${getOrderFullDate(order)} at ${getOrderHour(order)}`}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.orderItems[0].productName}</td>
                    <td>{order.orderItems[0].quantity}</td>
                  </tr>
                  {order.orderItems
                    .filter((_, index) => index !== 0)
                    .map((orderItem, index) => {
                      return (
                        <tr key={orderItem.productId}>
                          <td colSpan={4}></td>
                          <td>{orderItem.productName}</td>
                          <td>{orderItem.quantity}</td>
                        </tr>
                      );
                    })}
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ReportsTable;

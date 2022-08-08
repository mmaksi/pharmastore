import axios from "axios";
import { Fragment } from "react";
import { Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import API_URL from "../utils/API_URL";

const OrdersTable = ({ orders }) => {
  const deleteOrderHandler = async (event) => {
    const checkBoxElement = event.target;
    const deliveredOrderId =
      (checkBoxElement?.parentElement?.parentNode?.parentNode
        ?.firstElementChild).innerText;
    try {
      await axios.delete(`${API_URL}/orders/${deliveredOrderId}`);
      window.location.reload();
    } catch (error) {
      alert("Cannot set this order as delivered. Try again please.");
    }
  };

  return (
    <>
      <Container className="mt-4">
        <Table bordered={false} borderless={false} responsive="md">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Delivered</th>
              <th>User Name</th>
              <th>Order Total</th>
              <th>Order Items</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {orders.map((order, index) => {
              return (
                <Fragment key={order.orderId}>
                  <tr>
                    <td hidden={true}>{order.orderId}</td>
                    <td>{index + 1}</td>
                    <td>
                      <Form.Check
                        type="checkbox"
                        onClick={deleteOrderHandler}
                      />
                    </td>
                    <td>{order.user.username}</td>
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

export default OrdersTable;
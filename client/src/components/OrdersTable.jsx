import axios from "axios";
import { Fragment, useState } from "react";
import { Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import API_URL from "../utils/API_URL";
import { ReactComponent as Rocket } from "../assets/rocket-1.svg";

const OrdersTable = ({ orders }) => {
  const [loading, setLoading] = useState(false)

  const deleteOrderHandler = async (event) => {
    const checkBoxElement = event.target;
    const deliveredOrderId =
      (checkBoxElement?.parentElement?.parentNode?.parentNode
        ?.firstElementChild).innerText;
    try {
      setLoading(true)
      await axios.delete(`${API_URL}/orders/${deliveredOrderId}`);
      window.location.reload(); // refresh page
    } catch (error) {
      alert("Cannot set this order as delivered. Try again please.");
    }
  };

  return (
    <>
      {/* Loader Animation */}
      {loading && (
        <div className="loader">
          <Rocket style={{ position: "absolute" }} />
        </div>
      )}

      {!loading && (
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
      )}
    </>
  );
};

export default OrdersTable;

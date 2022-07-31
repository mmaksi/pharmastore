import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import fetchOrdersStartAsync from "../store/orders/orders.action";
import { selectOrders } from "../store/orders/orders.selector";
import { Container } from "react-bootstrap";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  // console.log(orders);

  useEffect(() => {
    dispatch(fetchOrdersStartAsync());
  }, [dispatch]);

  return (
    <Container>
      <h1>Orders</h1>
      {orders.map((order) => {
        return order.orderId;
      })}
    </Container>
  );
};

export default Orders;

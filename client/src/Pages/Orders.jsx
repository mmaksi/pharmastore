import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import fetchOrdersStartAsync from "../store/orders/orders.action";
import { selectOrders } from "../store/orders/orders.selector";
import { Container } from "react-bootstrap";
import OrdersTable from "../components/OrdersTable";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchOrdersStartAsync());
  }, [dispatch]);

  return (
    <Container>
        <h1 className="text-center mb-4">ORDERS</h1>
        {orders.length ? <OrdersTable orders={orders} /> : <h5 className="text-center">No orders at the moment.</h5>}
    </Container>
  );
};

export default Orders;

// const sentOrders = orders.reduce((acc, curr) => {
//   const name = curr.user.username;
//   if (acc[name]) {
//     acc[name] = [...acc[name], ...curr.orderItems];
//   } else {
//     acc[name] = [...curr.orderItems];
//   }
//   return acc;
// }, []);

// const uniqueUsers = [...new Set(orders.map((item) => item.user.username))];

// console.log(sentOrders.will[0]["_id"]);

// console.log(allOrders.will[0]["_id"]);

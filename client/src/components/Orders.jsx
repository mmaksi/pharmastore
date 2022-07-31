import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import fetchOrdersStartAsync from "../store/orders/orders.action";
import { selectOrders } from "../store/orders/orders.selector";
import { Container } from "react-bootstrap";

const Orders = () => {
  const dispatch = useDispatch();

  // creating user objects based on their orders
  const orders = useSelector(selectOrders);
  const uniqueUsers = [...new Set(orders.map(item => item.user.username))];
  const sentOrders = uniqueUsers.map((uniqueUser) => {
    const userOrders = orders.map((order) => {
      if (order.user.username === uniqueUser) {
        return [...order.orderItems]
      }
    })
    const userObj = { user: uniqueUser, orders: userOrders, isDelivered: false }
    return userObj
  })

  console.log(sentOrders);

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

// const arr = [
//   {
//     user: {
//       username: "john"
//     },
//     orderItems: ["phone", "laptop"]
//   },
//   {
//     user: {
//       username: "john"
//     },
//     orderItems: ["monitor"]
//   },
//   {
//     user: {
//       username: "paul"
//     },
//     orderItems: ["board"]
//   },
// ]
// const unique = [...new Set(arr.map(item => item.user.username))];
// console.log(unique)
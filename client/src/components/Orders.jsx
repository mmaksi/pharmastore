import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import fetchOrdersStartAsync from "../store/orders/orders.action";
import { selectOrders } from "../store/orders/orders.selector";
import { Container } from "react-bootstrap";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  // creating user objects based on their orders
  const orders = useSelector(selectOrders);
  // console.log(orders);

  const userOrders = orders.map((order) => {
    const user = {...order.user}
    user.totalPrice = order.totalPrice
    user.userItems = order.orderItems

    return {user}
  })

  const sentOrders = orders.reduce((acc, curr) => {
    const name = curr.user.username;
    if (acc[name]) {
      acc[name] = [...acc[name], ...curr.orderItems];
    } else {
      acc[name] = [...curr.orderItems];
    }
    return acc;
  }, []);

  const uniqueUsers = [...new Set(orders.map((item) => item.user.username))];

  // console.log(sentOrders.will[0]["_id"]);

  useEffect(() => {
    setAllOrders(sentOrders);
  }, sentOrders);

  // console.log(allOrders.will[0]["_id"]);

  useEffect(() => {
    dispatch(fetchOrdersStartAsync());
  }, [dispatch]);

  return (
    <Container>
      <h1>Orders</h1>
      {userOrders.map((order) => {
        return (
          <>
            <h3>{order.user.username}</h3>
            {order.user.userItems.map((userItem) => <p>{userItem._id}</p>)}
          </>
        )
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

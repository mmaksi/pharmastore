import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import fetchOrdersStartAsync from "../store/orders/orders.action";
import { selectOrders } from "../store/orders/orders.selector";

const Orders = () => {
  const dispatch = useDispatch()
  const orders = useSelector(selectOrders)
  console.log(orders);

  useEffect(() => {
    dispatch(fetchOrdersStartAsync());
  }, [dispatch]);

  return <div className="text-center">Orders</div>;
};

export default Orders;

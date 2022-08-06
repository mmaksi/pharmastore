import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import fetchOrdersStartAsync from "../store/orders/orders.action";
import { selectOrders, selectOrdersIsLoading } from "../store/orders/orders.selector";
import { Container } from "react-bootstrap";
import OrdersTable from "../components/OrdersTable";
import { ReactComponent as PulseLoader } from '../assets/pulse-1.svg';
import { ReactComponent as HeartLoader } from '../assets/heart-1.svg';
import "../components/Spinner.scss"

const Orders = () => {
  // const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectOrdersIsLoading)

  useEffect(() => {
    dispatch(fetchOrdersStartAsync());
  }, [dispatch]);

  return (
    <Container>
        {loading && (
        <div className="loader">
          <PulseLoader style={{ position: "absolute" }}/>
          <HeartLoader />
        </div>)}
        {!loading && <h1 className="text-center mb-4">ORDERS</h1>}
        {(!loading && orders.length === 0) && <h4 className="text-center">There are no orders yet.</h4>}
        {(!loading && orders.length > 0) && <OrdersTable orders={orders} />}
    </Container>
  );
};

export default Orders;
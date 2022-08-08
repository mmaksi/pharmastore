import { Container } from "react-bootstrap";
import { ReactComponent as PulseLoader } from "../assets/pulse-1.svg";
import { ReactComponent as HeartLoader } from "../assets/heart-1.svg";
import "../components/Spinner.scss";
import ReportsTable from "../components/ReportsTable";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../utils/API_URL";

const Reports = () => {
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDeliveredOrders() {
      const { data } = await axios.get(`${API_URL}/orders/delivered`);
      setLoading(!loading);
      setDeliveredOrders(data);
    }
    getDeliveredOrders();
  }, []);

  console.log(deliveredOrders);
  return (
    <Container>
      {loading && (
        <div className="loader">
          <PulseLoader style={{ position: "absolute" }} />
          <HeartLoader />
        </div>
      )}
      {!loading && <h1 className="text-center mb-4">HISTORY OF DELIVERED ORDERS</h1>}
      {!loading && deliveredOrders.length === 0 && (
        <h4 className="text-center">There are no delivered orders yet.</h4>
      )}
      {!loading && deliveredOrders.length > 0 && (
        <ReportsTable deliveredOrders={deliveredOrders} />
      )}
    </Container>
  );
};

export default Reports;

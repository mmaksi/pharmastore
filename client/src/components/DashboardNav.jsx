import "./DashboardNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus, faStore } from "@fortawesome/free-solid-svg-icons";

const DashboardNav = ({setSideNavOptions}) => {
  const setAddProduct = () => {
    setSideNavOptions({addProduct: true, removeProduct: false, showOrders: false})
  }

  const setRemoveProduct = () => {
    setSideNavOptions({addProduct: false, removeProduct: true, showOrders: false})
  }

  const setShowOrders = () => {
    setSideNavOptions({addProduct: false, removeProduct: false, showOrders: true})
  }

  return (
    <div className="dashboardNav pt-5">
      <div className="dashboardNav__option pt-5">
        <div className="dashboardNav__option--add pb-3" onClick={setAddProduct}>
          <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
          <span className="h5">Add Product</span>
        </div>
        
        <div className="dashboardNav__option--remove pb-3" onClick={setRemoveProduct}>
          <FontAwesomeIcon icon={faCircleMinus} className="me-2" />
          <span className="h5">Remove Product</span>
        </div>

        <div className="dashboardNav__option--remove pb-3" onClick={setShowOrders}>
          <FontAwesomeIcon icon={faStore} className="me-2" />
          <span className="h5">Orders</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;

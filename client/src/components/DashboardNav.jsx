import "./DashboardNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const DashboardNav = () => {
  return (
    <div className="dashboardNav pt-5">
      <div className="dashboardNav__option pt-5">
        <div className="dashboardNav__option--add pb-3">
          <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
          <span className="h5">Add Product</span>
        </div>
        <div className="dashboardNav__option--remove pb-3">
          <FontAwesomeIcon icon={faCircleMinus} className="me-2" />
          <span className="h5">Remove Product</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;

import { useState } from "react";
import AddProductForm from "../components/AddProductForm";
import DashboardForm from "../components/DashboardForm";
import DashboardNav from "../components/DashboardNav";
import Orders from "../components/Orders";
import RemoveProductForm from "../components/RemoveProductForm";

const Admin = () => {
  const [sideNavOptions, setSideNavOptions] = useState({
    addProduct: true,
    removeProduct: false,
    showOrders: false
  });

  return (
    <div>
      <DashboardNav setSideNavOptions={setSideNavOptions} />

      {sideNavOptions.addProduct && (
        <AddProductForm
          title="Add a new product"
          btnDetails={{ title: "Add product", type: "submit" }}
        />
      )}

      {sideNavOptions.removeProduct && (
        <RemoveProductForm
          title="Remove a product"
          labels={["Product Name"]}
          placeholders={[
            "Product Name"
          ]}
          btnDetails={{ title: "Remove product", type: "submit" }}
          types={["text"]}
          names={["productName"]}
          mins={[undefined]}
          accepts={[null]}
          formSubTitle=""
          invalidInputMessages={[
            "This field is required"
          ]}
        />
      )}

      {sideNavOptions.showOrders && (
        <Orders />
      )}
    </div>
  );
};

export default Admin;

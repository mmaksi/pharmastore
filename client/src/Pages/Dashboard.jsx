import { useState } from "react";
import DashboardForm from "../components/DashboardForm";
import DashboardNav from "../components/DashboardNav";
import Orders from "../components/Orders";

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
        <DashboardForm
          title="Add a new product"
          labels={["Product Name", "Product Category", "Product Price", "Product Image"]}
          placeholders={[
            "Product Name",
            "Product's Category",
            "Product's Price",
            "Upload an image for the product",
          ]}
          btnDetails={{ title: "Add product", type: "submit" }}
          types={["text", "text", "text", "file"]}
          names={["productName", "category", "price", "imageUrl"]}
          accepts={[null, null, null, "image/*"]}
        />
      )}

      {sideNavOptions.removeProduct && (
        <DashboardForm
          title="Remove a product"
          labels={["Product Name"]}
          placeholders={[
            "Product Name"
          ]}
          btnDetails={{ title: "Remove product", type: "submit" }}
          types={["text"]}
          names={["productName"]}
        />
      )}

      {sideNavOptions.showOrders && (
        <Orders />
      )}
    </div>
  );
};

export default Admin;

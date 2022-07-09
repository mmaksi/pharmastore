import { useState } from "react";
import DashboardForm from "../components/DashboardForm";
import DashboardNav from "../components/DashboardNav";

const Admin = () => {
  const [sideNavOptions, setSideNavOptions] = useState({
    addProduct: true,
    removeProduct: false,
  });

  return (
    <div>
      <DashboardNav setSideNavOptions={setSideNavOptions} />

      {sideNavOptions.addProduct && (
        <DashboardForm
          title="Add a new product"
          labels={["Product Name", "Category", "Image URL", "Product Price"]}
          placeholders={[
            "Product Name",
            "Product's Category",
            "Paste the product's mage URL here",
            "Product's Price",
          ]}
          btnDetails={{ title: "Add product", type: "submit" }}
          types={["text", "text", "text", "text"]}
          names={["productName", "category", "imageUrl", "price"]}
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
    </div>
  );
};

export default Admin;

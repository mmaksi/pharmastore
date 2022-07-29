import "./AddProduct.scss";
import {
  selectIsAdmin,
  selectUserIsLoggedIn,
} from "../store/users/users.selector";
import { useSelector } from "react-redux";
import AuthErr from "../components/AuthErr";
import AddProductForm from "./AddProductForm";

const AddProduct = () => {
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);

  return (
    <>  
      {(isLoggedIn && isAdmin) ? <AddProductForm /> : <AuthErr /> }
    </>
  );
};

export default AddProduct;

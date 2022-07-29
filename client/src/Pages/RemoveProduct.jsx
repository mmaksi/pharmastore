import RemoveProductForm from "./RemoveProductForm";
import AuthErr from "../components/AuthErr";
import {
  selectIsAdmin,
  selectUserIsLoggedIn,
} from "../store/users/users.selector";
import { useSelector } from "react-redux";

const RemoveProduct = () => {
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);

  return (
    <>  
      {(isLoggedIn && isAdmin) ? <RemoveProductForm /> : <AuthErr /> }
    </>
  );
};

export default RemoveProduct;

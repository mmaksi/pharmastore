import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./Cart.scss";

interface IProps {
  count: number
}

const Cart: React.FC<IProps> = ({ count }) => {
  return (
    <>
     <FontAwesomeIcon icon={faCartShopping} />
      <span className="cartCount cartCount__badge">
        {count}
      </span>
    </>
  );
};

export default Cart;

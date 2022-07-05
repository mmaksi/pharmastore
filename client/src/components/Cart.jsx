import React from "react";
import "./Cart.scss";

const Cart = () => {
  return (
    <>
      <i className="fa cart" style={{ fontSize: "18px" }}>
        &#xf07a;
      </i>
      <span className="cartCount cartCount__badge">
        5
      </span>
    </>
  );
};

export default Cart;

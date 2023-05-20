import React from "react";
import FormatPrice from "../Helpers/FormatPrice";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import CartAmountToggle from "./CartAmountToggle";

const CartItem = ({ _id, name, cover, price, amount }) => {
  const { removeItem , setDecrease, setIncrease} = useCartContext();

  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={cover} alt={_id} />
          </figure>
        </div>
        <div>
          <p>{name}</p>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>
      {/* quintity */}
      <CartAmountToggle
        amount={amount}
        setDecrease={() => setDecrease(_id)}
        setIncrease={() => setIncrease(_id)}
      />
      {/* subtotal */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * amount} />
        </p>
      </div>
      {/* remove item */}
      <div>
        <FaTrash className="remove_icon" onClick={() => removeItem(_id)} />
      </div>
    </div>
  );
};

export default CartItem;

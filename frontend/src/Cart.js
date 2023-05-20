import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCartContext } from "./context/cart_context";
import CartItem from "./components/CartItem";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FormatPrice from "./Helpers/FormatPrice";
import { Button } from "./styles/Button";
import axios from "axios";


const Cart = () => {
  const navigate = useNavigate();
  const { cart, clearCart, total_price } = useCartContext();
  //console.log(cart);
  let[email, setEmail] = useState();
  let userEmail = email;
  console.log(userEmail, "cart user email");
  useEffect(() => {
    getUserEmail();
  }, []);

  // when clear cart empty after show this
  if (cart.length === 0) {
    return (
      <EmptyDiv>
      <img src="https://img.freepik.com/free-vector/cart-basket-shopping-icons-finance_24911-45461.jpg?w=340&t=st=1683287807~exp=1683288407~hmac=5514934a36153b113f847ee28966b3da834911db9058e2ee6d6567c865eff4af" className="trolly-image" alt="empty trolly" />
        <h3>No Cart in Item</h3>
      </EmptyDiv>
    );
  };

  //create function for user email
  const getUserEmail = async () => {
    try {
      const res = await fetch("http://localhost:4000/useremail", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setEmail(data.email);
      console.log(data, "hello data");
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  function loadRazorpay(value) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = value
        //document.body.appendChild(script)
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })

}

async function displayRazorpay() {

  const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
      alert("Razorpay filed to load. Are you online?");
      return
  }

  const data = await fetch("http://localhost:4000/razorpay", { method: "POST" }).then((e) => e.json());
  //console.log(data, "hello");

  var options = {
      "key": "rzp_test_jcgatEbWcdXvXo", // Enter the Key ID generated from the Dashboard
      "amount": (total_price * 1).toString(), // Amount is in currency 
      "currency": data.currency,
      "orderId": data.id,
      "name": "Dsp Book Store", 
      "description": "Thank you for shopping online",
      "image": "https://images3.penguinrandomhouse.com/cover/9780141001821",
      "handler": async function (response) {
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)
          // console.log(response, "Razorpay Reaponse");
          await axios.post("http://localhost:4000/placeorder", { cart, response, total_price, userEmail, clearCart })
          //clearCart([]);
          navigate("/previusorders")
          console.log(res);
      },

      "prefill": {
        "name":" ",
      },

  };
  var paymentObj = new window.Razorpay(options);
  paymentObj.open();

};

  return (
    <Wrapper>
      <div className="container">
        <div className="cart_heading grid grid-five-column">
          <p>Item</p>
          <p className="cart-hide">Price</p>
          <p>Quantity</p>
          <p className="cart-hide">Subtotal</p>
          <p>Remove</p>
        </div>
        <hr />
        <div className="cart-item">
          {cart.map((curElem) => {
            return <CartItem key={curElem._id} {...curElem} />;
          })}
        </div>
        <hr />
        <div className="cart-two-button">
          <NavLink to="/products">
            <Button>Continue Shopping</Button>
          </NavLink>
          <Button onClick={clearCart} className="btn btn-clear">
            Clear Cart
          </Button>
        </div>
        {/* ADD TOTAL AMOUNT */}
        <div className="order-total--amount">
          <div className="order-total--subdata">
            <div>
              <p>Order Total:</p>
              <p>
                <FormatPrice price={total_price} />
              </p>
            </div>
            <hr />
            <Button onClick={displayRazorpay} >
              CheckOut
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const EmptyDiv = styled.div`
  display: grid;
  place-items: center;
  height: 50vh;
  h3 {
    font-size: 4.2rem;
    text-transform: capitalize;
    font-weight: 300;
  }
`;

const Wrapper = styled.section`
  padding: 9rem 0;

  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }
  .cart-heading {
    text-align: center;
    text-transform: uppercase;
  }
  hr {
    margin-top: 1rem;
  }
  .cart-item {
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 5.4rem;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    h2 {
      font-size: 2.4rem;
    }
  }
  .trolly-image {
    width: 55%;
    height: auto;
  }
  .cart-user--name {
    text-transform: capitalize;
  }
  .cart-image--name {
    /* background-color: red; */
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.4fr 1fr;
    text-transform: capitalize;
    text-align: left;
    img {
      max-width: 5rem;
      height: 5rem;
      object-fit: contain;
      color: transparent;
    }

    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .color-style {
        width: 1.4rem;
        height: 1.4rem;

        border-radius: 50%;
      }
    }
  }

  .cart-two-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;

    .btn-clear {
      background-color: #e74c3c;
    }
  }

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }

  .remove_icon {
    font-size: 1.6rem;
    color: #e74c3c;
    cursor: pointer;
  }

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .order-total--subdata {
      border: 0.1rem solid #f0f0f0;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      padding: 3.2rem;
    }
    div {
      display: flex;
      gap: 3.2rem;
      justify-content: space-between;
    }

    div:last-child {
      background-color: #fafafa;
    }

    div p:last-child {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-five-column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
    .cart-hide {
      display: none;
    }

    .cart-two-button {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      gap: 2.2rem;
    }

    .order-total--amount {
      width: 100%;
      text-transform: capitalize;
      justify-content: flex-start;
      align-items: flex-start;

      .order-total--subdata {
        width: 100%;
        border: 0.1rem solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        padding: 3.2rem;
      }
    }
  }
`;

export default Cart;

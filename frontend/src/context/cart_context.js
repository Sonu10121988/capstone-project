
import { useEffect } from "react";
import { createContext, useReducer, useContext } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getLocalCardData = ()=>{
   let localBookData = localStorage.getItem("bookCart");
   if(localBookData === []){
    return [];
   } else {
    return JSON.parse(localBookData);
   }
};

const initialState = {
   //cart: [],
   cart:getLocalCardData(),
   total_item: "",
   total_price: "",
   shipping_fee: 50000,
};

const CartProvider = ({children})=>{
   const [state, dispatch] = useReducer(reducer,initialState)

    const addToCart = (_id, amount, product)=>{
       dispatch({type: "ADD_TO_CART", payload:{_id, amount, product}})
    };

    // increment and decrement in cart item
    const setDecrease = (_id)=>{
       dispatch({type: "SET_DECREMENT", payload: _id});
    };
    const setIncrease = (_id)=>{
        dispatch({type: "SET_INCREMENT", payload: _id});
     };

    // remove single book
    const removeItem = (_id) => {
        dispatch({ type: "REMOVE_ITEM", payload: _id });
      };

    //   clear cart
    const clearCart =()=>{
        dispatch({type: "CLEAR_CART"});
    };

    //   send data localStorage
    useEffect(() =>{
        dispatch({type: "CART_TOTAL_ITEM"});
        dispatch({type: "CART_TOTAL_AMOUNT"});
        localStorage.setItem("bookCart", JSON.stringify(state.cart))
    },[state.cart])
    
    return <CartContext.Provider value={{...state, addToCart, removeItem, clearCart,setDecrease, setIncrease}}>
        {children}
    </CartContext.Provider>
};

const useCartContext = ()=>{
    return useContext(CartContext);
}

export {CartProvider, useCartContext};
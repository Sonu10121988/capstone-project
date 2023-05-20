

const cartReducer=(state, action) =>{
    if(action.type === "ADD_TO_CART"){
        let {_id, amount, product}= action.payload;
        //console.log(product);

        // handle the existing book 
        let existingBook = state.cart?.find((curItem) => curItem._id === _id);
        //console.log(existingBook);
        if(existingBook){
         let updateBook = state.cart?.map((curItem)=>{
          if(curItem._id === _id){
            let newAmount = curItem.amount +amount;
            return{
              ...curItem,
              amount: newAmount,
            }
          } else{
            return curItem;
          }
         });
         return {
            ...state,
            cart:updateBook,
        
         }
        } else{
        let cartProduct;
        cartProduct={
            _id,
           name:product.name,
           price: product.price,
           amount,
           cover:product.cover,
        }
        return {
            ...state,
            cart:[...state.cart, cartProduct],
        }
    };
  };

    // set decrement value in cart item
     if(action.type === "SET_DECREMENT"){
      let updateBook = state.cart?.map((curElement)=>{
        if(curElement._id === action.payload){
          let decreAmount = curElement.amount - 1;

          if(decreAmount <= 1){
            decreAmount = 1;
          }

          return {
            ...curElement,
            amount: decreAmount,
          }
        } else {
          return curElement;
        }
      });
      return {
        ...state,
        cart: updateBook,
      }
     };

    //  set increment value in cart item
    if(action.type === "SET_INCREMENT"){
      let updateBook = state.cart?.map((curElement)=>{
        if(curElement._id === action.payload){
          let increAmount = curElement.amount + 1;

          if(increAmount >= 15){
            increAmount = 15;
          }

          return {
            ...curElement,
            amount: increAmount,
          }
        } else {
          return curElement;
        }
      });
      return {
        ...state,
        cart: updateBook,
      }
     };

    // remove single book
    if (action.type === "REMOVE_ITEM") {
        let updatedCart = state.cart?.filter(
          (curItem) => curItem._id !== action.payload
        );
        return {
          ...state,
          cart: updatedCart,
        };
      };

      // clear cart
      if(action.type === "CLEAR_CART"){
        return{
          ...state,
          cart: [],
        }
      };

      // cart total item show bucket navbar
      if(action.type === "CART_TOTAL_ITEM"){
        //console.log(state, "hello");
        let updateItemValue = state.cart?.reduce((initialVal, curElem)=>{
          let {amount} = curElem;

          initialVal = initialVal + amount;
          return initialVal;
        },0);

        return {
          ...state,
          total_item: updateItemValue,
        };
      };

      // final total amount add shipping fee
      if(action.type === "CART_TOTAL_AMOUNT"){
      let total_price = state.cart?.reduce((initialValue, curElem)=> {
         let {price, amount} = curElem;
         initialValue = initialValue + price * amount;
          return initialValue;
      },0);

      return {
        ...state,
        total_price,
      };
      };
  return state;
}

export default cartReducer ;

const filterReducer = (state, action)=>{
switch(action.type){

    case "LOAD_FILTER_PRODUCTS":
        let priceArr = action.payload.map((currentElem)=> currentElem.price);
        //console.log(priceArr);
        let maxPrice = Math.max(...priceArr);
        //console.log(maxPrice);
        return {
            ...state,
            filter_products: [...action.payload],
            all_products: [...action.payload],
            filters: {...state.filters, maxPrice, price: maxPrice},
        };

        case "SET_GRID_VIEW":
        return {
            ...state,
            grid_view: true,
        };
        case "SET_LIST_VIEW":
            return {
                ...state,
            grid_view: false,
            };
            // USE SORT VALUE
            case "GET_SORT_VALUE":
                // let userSortVal = document.getElementById("sort");
                // let sort_val = userSortVal.options[userSortVal.selectedIndex].value;
            return {
                ...state,
                sorting_value: action.payload,
            };

            case "SORTING_PRODUCTS":
                let newSortData;
                // let tempSortProduct = [...action.payload];

                const {filter_products, sorting_value} = state;
                let tempSortProduct = [...filter_products];
                
                // use ascending price,discending price,ascending order name, discending order name
                const sortingProducts=(a,b)=>{
                    if(sorting_value === "lowest"){
                        return a.price-b.price;
                    };
                    if(sorting_value === "highest"){
                        return b.price-a.price;
                    };
                    if(sorting_value === "a-z"){
                       return a.name.localeCompare(b.name)
                    };
                    if(sorting_value === "z-a"){
                        return b.name.localeCompare(a.name)
                    };
                };

                newSortData = tempSortProduct.sort(sortingProducts);

                return {
                    ...state,
                    filter_products: newSortData,
                };

                // use search filter value
                case "UPDATE_FILTER_VALUE":
                    const {name, value} = action.payload;
                    return {
                        ...state,
                        filters: {
                            ...state.filters,
                            [name]: value,
                        }
                    };
                    case "FILTER_PRODUCTS":
                        let {all_products} = state;
                        let tempFilterProduct = [...all_products];

                       const {text, author, price} = state.filters;
                       if(text){
                        tempFilterProduct = tempFilterProduct.filter((currentElem)=>{
                            return currentElem.name.toLowerCase().includes(text);
                        });
                       };
                    //    search author wise
                    if (author !== "all") {
                        tempFilterProduct = tempFilterProduct.filter(
                          (curElem) => curElem.author.toLowerCase() === author.toLowerCase()
                        );
                      };
                    //   if user changing price range
                    if(price === 0){
                        tempFilterProduct = tempFilterProduct.filter(
                            (curElem) => curElem.price === price
                        );
                    } else{
                        tempFilterProduct = tempFilterProduct.filter(
                            (curElem) => curElem.price <= price
                        );
                    };

                        return {
                            ...state,
                            filter_products: tempFilterProduct,
                        };
                        // clear filters
                        case "CLEAR_FILTERS":
                        return {
                            ...state,
                            filters: {
                              ...state.filters,
                              text: "",
                              author: "all",
                              maxPrice: 0,
                              price: state.filters.maxPrice,
                              minPrice: state.filters.maxPrice,
                            },
                        };
     


    default: 
    return state;
}
};
export default filterReducer;
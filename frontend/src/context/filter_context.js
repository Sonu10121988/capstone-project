import { createContext, useContext, useEffect, useReducer } from "react";
import {useProductContext} from './ProductContext';
import reducer from '../reducer/filterReducer';

const FilterContext = createContext();
const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: true,
    sorting_value: "lowest", 
    filters: {
        text: "",
        author: "all",
        maxPrice: 0,
        price: 0,
        minPrice: 0,
    }
};

export const FilterContextProvider = ({children}) => {
    const {products} = useProductContext();

    const [state, dispatch] = useReducer(reducer, initialState);
    
    // use grid view
    const setGridView = ()=>{
        return dispatch({type: "SET_GRID_VIEW"});
    };
    // use list view
    const setListView = ()=>{
        return dispatch({type: "SET_LIST_VIEW"});
    };

    // use sort list price and alphabatical 
    const sorting =(event)=>{
        let userValue = event.target.value;
        dispatch({type: "GET_SORT_VALUE", payload: userValue});
    };
    // search filter value
    const updateFilterValue = (event) =>{
      let name = event.target.name;
      let value = event.target.value;

      return dispatch({type: "UPDATE_FILTER_VALUE", payload:{name,value}})
    };

    // clear filter
    const clearFilters = () => {
        dispatch({ type: "CLEAR_FILTERS" });
      };


    // use useeffect for sorting product
    useEffect(()=>{
        dispatch({type: "FILTER_PRODUCTS"})
        dispatch({type: "SORTING_PRODUCTS"});
    }, [state.sorting_value, state.filters]);

    // grid and view products
    useEffect(()=>{
        dispatch({type: "LOAD_FILTER_PRODUCTS", payload: products});
    }, [products]);
    
  return ( 
  <FilterContext.Provider value={{...state, setGridView, setListView, sorting, updateFilterValue, clearFilters}}>
  {children}
  </FilterContext.Provider>
  )
};

export const useFilterContext = ()=>{
    return useContext(FilterContext);
}
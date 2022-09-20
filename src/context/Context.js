import { createContext, useContext, useReducer } from "react";
import faker from "faker";
import { cartReducer, productReducer, authReducer } from "./Reducers";
export const Cart = createContext();
faker.seed(99);

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
    genres: {
      1: "Adventure stories",
      2: "Crime",
      3: "Horror",
      4: "Mystery",
      5: "Poetry",
      6: "Thrillers",
      7: "War",
      8: "Women’s fiction",
    },
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
    category: 0,
  });

  const [authState, authDispatch] = useReducer(authReducer, {
    userLogin: false,
    adminLogin: false,
    sellerLogin: false,
    guest: true,
  });
  return (
    <Cart.Provider
      value={{
        state,
        dispatch,
        productState,
        productDispatch,
        authState,
        authDispatch,
      }}
    >
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;

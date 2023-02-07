import Counter from "./Counter";
import React from "react";
import { render } from "@testing-library/react";
// import { renderHook } from "@testing-library/react-hooks";
import { renderHook } from "@testing-library/react-hooks/server";
import Login from "./Login/Login";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, screen } from "@testing-library/react";

import Context, { CartState, Cart } from "../context/Context";
const state = {
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
};
const dispatch = jest.fn();
const productState = {
  byStock: false,
  byFastDelivery: false,
  byRating: 0,
  searchQuery: "",
  category: 0,
};
const productDispatch = jest.fn();
const authState = {
  userLogin: false,
  adminLogin: false,
  sellerLogin: false,
  guest: true,
};
const authDispatch = jest.fn();
const wrapper = ({ children }) => (
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

const mockUseContext = jest.fn().mockImplementation(() => ({
  state,
  dispatch,
  productState,
  productDispatch,
  authState,
  authDispatch,
}));

React.useContext = mockUseContext;

describe("useFeature test", () => {
  test("should return present feature toggles  with its state and dispatch function", () => {
    render(<Context />);
    const { result } = renderHook(() => CartState(), { wrapper });
    //console.log(result.all);
    //console.log(result.error);
    //console.log(result.current);
    expect(result.authState.guest).toBe(true);
  });
});

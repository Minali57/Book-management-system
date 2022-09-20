export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c._uuid !== action.payload._uuid),
      };
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c._uuid === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };
    case "GET_BOOKS":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case "FILTER_BY_STOCK":
      return { ...state, byStock: !state.byStock };
    case "FILTER_BY_DELIVERY":
      return { ...state, byFastDelivery: !state.byFastDelivery };
    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload };
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "CLEAR_FILTERS":
      return {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        category: 0,
      };
    case "FILTER_BY_CATEGORY":
      return { ...state, category: action.payload };
    default:
      return state;
  }
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "ADMIN_LOGIN":
      return {
        ...state,
        userLogin: false,
        adminLogin: true,
        sellerLogin: false,
        guest: false,
      };
    case "BUYER_LOGIN":
      return {
        ...state,
        userLogin: true,
        adminLogin: false,
        sellerLogin: false,
        guest: false,
      };
    case "SELLER_LOGIN":
      return {
        ...state,
        userLogin: false,
        adminLogin: false,
        sellerLogin: true,
        guest: false,
      };
    case "LOGOUT":
      return {
        ...state,
        userLogin: false,
        adminLogin: false,
        sellerLogin: false,
        guest: true,
      };
    default:
      return state;
  }
};

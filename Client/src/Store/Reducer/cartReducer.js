import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT,
  CLEAR_CART,
  DECREASE_QUANTITY,
} from "../Actions/cartActions";

const initialCartState = {
  cartItems: [],
};

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      const existingCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (existingCartItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    }
    case REMOVE_PRODUCT: {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };
    }
    case DECREASE_QUANTITY: {
      const existingCartItem = state.cartItems.find(
        (item) => item._id === action.payload
      );

      if (existingCartItem && existingCartItem.quantity > 1) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (item) => item._id !== action.payload
          ),
        };
      }
    }
    case CLEAR_CART: {
      return {
        ...state,
        cartItems: [],
      };
    }
    default:
      return state;
  }
};

export default cartReducer;

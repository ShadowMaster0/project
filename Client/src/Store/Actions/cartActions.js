export const ADD_PRODUCT_TO_CART = "addProductToCart";
export const REMOVE_PRODUCT = "removeProduct";
export const CLEAR_CART = "clearCart";
export const DECREASE_QUANTITY = "decreaseQuantity";

export const addProductToCart = (product) => ({
  type: ADD_PRODUCT_TO_CART,
  payload: product,
});

export const removeProduct = (productId) => ({
  type: REMOVE_PRODUCT,
  payload: productId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const decreaseQuantity = (productId) => ({
  type: DECREASE_QUANTITY,
  payload: productId,
});

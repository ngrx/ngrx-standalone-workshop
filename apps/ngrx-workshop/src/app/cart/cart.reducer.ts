import { createReducer, on } from "@ngrx/store";

import { productDetailsActions } from "../product/product-details/actions";
import { CartItem } from "@angular-monorepo/api-interfaces";

export const CART_FEATURE_KEY = "cart";

export interface CartState {
  cartItems?: CartItem[];
}

export const initialState: CartState = {
  cartItems: undefined,
};

export const cartReducer = createReducer(
  initialState,
  on(productDetailsActions.addToCart, (state, { productId }) => {
    const cartItemsClone = state.cartItems ? [...state.cartItems] : [];
    const cartItemIndex = cartItemsClone.findIndex(
      (cartItem) => cartItem.productId === productId
    );
    if (cartItemIndex < 0) {
      cartItemsClone.push({
        productId,
        quantity: 1,
      });
    } else {
      // Replace item with an item that has updated quantity
      cartItemsClone.splice(cartItemIndex, 1, {
        productId,
        quantity: cartItemsClone[cartItemIndex].quantity + 1,
      });
    }
    return {
      ...state,
      cartItems: cartItemsClone,
    };
  })
);

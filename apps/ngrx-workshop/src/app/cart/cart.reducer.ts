import { createReducer, on } from "@ngrx/store";

import { productDetailsActions } from "../product/product-details/actions";
import { CartItem } from "@angular-monorepo/api-interfaces";
import { cartActions } from "./actions";
import { EntityState, createEntityAdapter } from "@ngrx/entity";

export const CART_FEATURE_KEY = "cart";

export interface CartState {
  cartItems: EntityState<CartItem>;
}

export const cartAdapter = createEntityAdapter<CartItem>({
  selectId: (cartItem) => cartItem.productId,
});

export const initialState: CartState = {
  cartItems: cartAdapter.getInitialState(),
};

export const cartReducer = createReducer(
  initialState,
  on(productDetailsActions.addToCart, (state, { productId }) => {
    const currentQuantity =
      cartAdapter.getSelectors().selectEntities(state.cartItems)[productId]
        ?.quantity || 0;
    return {
      ...state,
      cartItems: cartAdapter.upsertOne(
        {
          productId,
          quantity: currentQuantity + 1,
        },
        state.cartItems
      ),
    };
  }),
  on(cartActions.fetchCartItemsSuccess, (state, { cartItems }) => ({
    ...state,
    cartItems: cartAdapter.upsertMany(cartItems, state.cartItems),
  })),
  on(cartActions.addToCartError, (state, { productId }) => {
    const currentQuantity =
      cartAdapter.getSelectors().selectEntities(state.cartItems)[productId]
        ?.quantity || 1;
    return {
      ...state,
      cartItems: cartAdapter.upsertOne(
        {
          productId,
          quantity: currentQuantity - 1,
        },
        state.cartItems
      ),
    };
  }),
  on(cartActions.purchaseSuccess, (state) => ({
    ...state,
    cartItems: cartAdapter.removeAll(state.cartItems),
  }))
);

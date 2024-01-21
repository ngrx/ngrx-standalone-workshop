import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState, CART_FEATURE_KEY, cartAdapter } from "./cart.reducer";
import { selectProducts } from "../product/product.selectors";
import { CartProduct } from "../model/product";

export const cartFeature = createFeatureSelector<CartState>(CART_FEATURE_KEY);

const { selectAll } = cartAdapter.getSelectors();

export const selectCartItemsEntities = createSelector(
  cartFeature,
  (state) => state.cartItems
);

export const selectCartItems = createSelector(
  selectCartItemsEntities,
  selectAll
);

export const selectCartItemsCount = createSelector(
  selectCartItems,
  (cartItems) =>
    cartItems
      ? cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
      : 0
);

export const selectCartProducts = createSelector(
  selectProducts,
  selectCartItems,
  (products, cartItems) => {
    if (!cartItems || !products) return undefined;
    return cartItems
      .map(({ productId, quantity }): CartProduct | undefined => {
        const product = products.find((p) => p.id === productId);
        if (!product) return undefined;
        return {
          ...product,
          quantity,
        };
      })
      .filter((cartProduct): cartProduct is CartProduct => cartProduct != null);
  }
);

export const selectCartTotal = createSelector(
  selectCartProducts,
  (cartItems) =>
    cartItems &&
    cartItems.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )
);

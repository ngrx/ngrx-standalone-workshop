import { CartItem } from "@angular-monorepo/api-interfaces";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const cartActions = createActionGroup({
  source: "Cart Effects",
  events: {
    timerTick: emptyProps(),
    fetchCartItemsSuccess: props<{ cartItems: CartItem[] }>(),
    fetchCartItemsError: props<{ errorMessage: string }>(),

    fetchCartItemsWithDetailsSuccess: props<{ cartItems: CartItem[] }>(),
    fetchCartItemsWithDetailsError: props<{ errorMessage: string }>(),

    addToCartSuccess: emptyProps(),
    addToCartError: props<{ productId: string; errorMessage: string }>(),

    removeProductSuccess: props<{ cartItems: CartItem[] }>(),
    removeProductError: props<{ errorMessage: string }>(),

    removeAllSuccess: props<{ cartItems: CartItem[] }>(),
    removeAllError: props<{ errorMessage: string }>(),

    purchaseSuccess: emptyProps(),
    purchaseError: props<{ errorMessage: string }>(),
  },
});

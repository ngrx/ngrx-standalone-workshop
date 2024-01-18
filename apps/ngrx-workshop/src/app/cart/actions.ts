import { CartItem } from "@angular-monorepo/api-interfaces";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const cartActions = createActionGroup({
  source: "Cart Effects",
  events: {
    timerTick: emptyProps(),
    fetchCartItemsSuccess: props<{ cartItems: CartItem[] }>(),
    fetchCartItemsError: props<{ errorMessage: string }>(),
  },
});

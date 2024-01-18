import { catchError, map, of, switchMap, timer } from "rxjs";
import { cartDetailsActions } from "./cart-details/actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { cartActions } from "./actions";
import { inject } from "@angular/core";
import { CartService } from "./cart.service";

const REFRESH_CART_ITEMS_INTERVAL_MS = 20 * 1000; // 20 seconds

export const fetchCartItems = createEffect(
  () => {
    const cartService = inject(CartService);
    return inject(Actions).pipe(
      ofType(
        cartActions.timerTick,
        cartDetailsActions.pageOpened,
        cartDetailsActions.purchaseSuccess
      ),
      switchMap(() =>
        cartService.getCartProducts().pipe(
          map((cartItems) => cartActions.fetchCartItemsSuccess({ cartItems })),
          catchError(() =>
            of(
              cartActions.fetchCartItemsError({
                errorMessage: "Error Fetching Cart Items",
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const init = createEffect(
  () =>
    timer(0, REFRESH_CART_ITEMS_INTERVAL_MS).pipe(
      map(() => cartActions.timerTick())
    ),
  { functional: true }
);

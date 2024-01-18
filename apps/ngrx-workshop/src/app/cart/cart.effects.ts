import { catchError, map, mergeMap, of, switchMap, timer } from "rxjs";
import { cartDetailsActions } from "./cart-details/actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { cartActions } from "./actions";
import { inject } from "@angular/core";
import { CartService } from "./cart.service";
import { productDetailsActions } from "../product/product-details/actions";

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

export const addProductToCart = createEffect(
  () => {
    const cartService = inject(CartService);
    return inject(Actions).pipe(
      ofType(productDetailsActions.addToCart),
      mergeMap(({ productId }) =>
        cartService.addProduct(productId).pipe(
          map(() => cartActions.addToCartSuccess()),
          // passing the productId to the Error, so it can be restored
          catchError(() =>
            of(
              cartActions.addToCartError({
                productId,
                errorMessage: "Error Adding To Cart",
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

import {
  catchError,
  concatMap,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  timer,
} from "rxjs";
import { cartDetailsActions } from "./cart-details/actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { cartActions } from "./actions";
import { inject } from "@angular/core";
import { CartService } from "./cart.service";
import { productDetailsActions } from "../product/product-details/actions";
import { Router } from "@angular/router";

const REFRESH_CART_ITEMS_INTERVAL_MS = 20 * 1000; // 20 seconds

export const fetchCartItems = createEffect(
  () => {
    const cartService = inject(CartService);
    return inject(Actions).pipe(
      ofType(cartActions.timerTick, cartActions.purchaseSuccess),
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

// Similar to fetchCartItems, however trigger is different and resulting action should trigger additional product effects
export const fetchCartItemsWithDetails = createEffect(
  () => {
    const cartService = inject(CartService);
    return inject(Actions).pipe(
      ofType(cartDetailsActions.pageOpened),
      switchMap(() =>
        cartService.getCartProducts().pipe(
          map((cartItems) =>
            cartActions.fetchCartItemsWithDetailsSuccess({ cartItems })
          ),
          catchError(() =>
            of(
              cartActions.fetchCartItemsWithDetailsError({
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

export const removeProduct = createEffect(
  () => {
    const cartService = inject(CartService);
    return inject(Actions).pipe(
      ofType(cartDetailsActions.removeProductClicked),
      concatMap(({ productId }) =>
        cartService.removeProduct(productId).pipe(
          map((cartItems) => cartActions.removeProductSuccess({ cartItems })),
          catchError(() =>
            of(
              cartActions.removeProductError({
                errorMessage: `Error removing product ${productId}`,
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const removeAll = createEffect(
  () => {
    const cartService = inject(CartService);
    return inject(Actions).pipe(
      ofType(cartDetailsActions.removeAllClicked),
      concatMap(() =>
        cartService.removeAll().pipe(
          map((cartItems) => cartActions.removeAllSuccess({ cartItems })),
          catchError(() =>
            of(
              cartActions.removeAllError({
                errorMessage: "Error removing products from the cart",
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const purchaseProducts = createEffect(
  () => {
    const cartService = inject(CartService);
    return inject(Actions).pipe(
      ofType(cartDetailsActions.purchaseClicked),
      concatMap(({ products }) => {
        const cartItems = products.map(({ id, quantity }) => ({
          productId: id,
          quantity,
        }));
        return cartService.purchase(cartItems).pipe(
          map((success) =>
            success
              ? cartActions.purchaseSuccess()
              : cartActions.purchaseError({
                  errorMessage: "Could not complete the purchase",
                })
          ),
          catchError(() =>
            of(
              cartActions.purchaseError({
                errorMessage: "Error during purchasing products",
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);

export const purchaseCompleted = createEffect(
  () => {
    const router = inject(Router);
    return inject(Actions).pipe(
      ofType(cartActions.purchaseSuccess),
      tap(() => {
        router.navigateByUrl("");
      })
    );
  },
  { functional: true, dispatch: false }
);

export const init = createEffect(
  () =>
    timer(0, REFRESH_CART_ITEMS_INTERVAL_MS).pipe(
      map(() => cartActions.timerTick())
    ),
  { functional: true }
);

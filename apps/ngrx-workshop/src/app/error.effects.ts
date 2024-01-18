import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";

import { MatSnackBar } from "@angular/material/snack-bar";
import { productApiActions } from "./product/actions";
import { inject } from "@angular/core";
import { cartActions } from "./cart/actions";

export const handleFetchErrors = createEffect(
  (actions$ = inject(Actions), snackBar = inject(MatSnackBar)) => {
    return actions$.pipe(
      ofType(
        productApiActions.productsFetchedError,
        cartActions.fetchCartItemsError,
        cartActions.addToCartError
      ),
      tap(({ errorMessage }) => {
        snackBar.open(errorMessage, "Error", {
          duration: 2500,
        });
      })
    );
  },
  { dispatch: false, functional: true }
);

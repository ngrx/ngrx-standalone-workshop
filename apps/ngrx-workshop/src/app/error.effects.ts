import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";

import { MatSnackBar } from "@angular/material/snack-bar";
import { productApiActions } from "./product/actions";
import { inject } from "@angular/core";

export const handleFetchErrors = createEffect(
  (actions$ = inject(Actions), snackBar = inject(MatSnackBar)) => {
    return actions$.pipe(
      ofType(productApiActions.productsFetchedError),
      tap(({ errorMessage }) => {
        snackBar.open(errorMessage, "Error", {
          duration: 2500,
        });
      })
    );
  },
  { dispatch: false, functional: true }
);

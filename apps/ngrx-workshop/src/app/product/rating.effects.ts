import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import { RatingService } from "./rating.service";
import { productsOpened } from "./product-list/actions";
import {
  catchError,
  concatMap,
  exhaustMap,
  filter,
  map,
  of,
  switchMap,
} from "rxjs";
import { ratingApiActions } from "./actions";
import { productDetailsActions } from "./product-details/actions";
import { selectCurrentProductId } from "./product.selectors";
import { Store } from "@ngrx/store";

export const fetchRatings = createEffect(
  () => {
    const ratingService = inject(RatingService);
    return inject(Actions).pipe(
      ofType(productsOpened),
      exhaustMap(() =>
        ratingService.getRatings().pipe(
          map((ratings) => ratingApiActions.ratingsFetchedSuccess({ ratings })),
          catchError(() =>
            of(
              ratingApiActions.ratingsFetchedError({
                errorMessage: "Failed to fetch ratings",
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const rateProduct = createEffect(
  () => {
    const ratingService = inject(RatingService);
    return inject(Actions).pipe(
      ofType(productDetailsActions.productRated),
      concatMap((productRating) =>
        ratingService.setRating(productRating).pipe(
          map((ratings) => ratingApiActions.setRatingSuccess({ ratings })),
          catchError(() =>
            of(
              ratingApiActions.setRatingError({
                errorMessage: "Failed to fetch ratings",
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const getRating = createEffect(
  () => {
    const ratingService = inject(RatingService);
    const store = inject(Store);
    return inject(Actions).pipe(
      ofType(productDetailsActions.pageOpened),
      concatLatestFrom(() =>
        store
          .select(selectCurrentProductId)
          .pipe(filter((id): id is string => id != null))
      ),
      switchMap(([, id]) =>
        ratingService.getRating(id).pipe(
          map((rating) => ratingApiActions.getRatingSuccess({ rating })),
          catchError(() =>
            of(
              ratingApiActions.getRatingError({
                errorMessage: "Failed to fetch ratings",
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

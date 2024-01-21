import { Review } from "@angular-monorepo/api-interfaces";
import { computed, inject } from "@angular/core";
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from "@ngrx/signals";
import {
  withEntities,
  addEntity,
  removeEntity,
  setEntities,
} from "@ngrx/signals/entities";
import { Store } from "@ngrx/store";
import { selectCurrentProductId } from "../../product.selectors";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { concatMap, filter, map, pipe, switchMap, tap } from "rxjs";
import { RatingService } from "../../rating.service";
import { tapResponse } from "@ngrx/operators";
import { reviewActions } from "./actions";

export const reviewsStore = signalStore(
  withEntities<Review>(),
  withComputed(({ entities }) => ({
    // An example of reading data from the Global Store into signalStore,
    // while maintaining Global Store as a source of truth.
    currentProductId: inject(Store).selectSignal(selectCurrentProductId),
    sortedReviews: computed(() => {
      const reviews = [...entities()];
      // Sort to have most recent first
      reviews.sort((r1, r2) => r2.reviewDate - r1.reviewDate);
      return reviews;
    }),
  })),
  withMethods(
    (
      store,
      globalStore = inject(Store),
      ratingService = inject(RatingService)
    ) => ({
      fetchReviews: rxMethod<string | undefined>(
        pipe(
          filter((p): p is string => p != null),
          switchMap((productId) =>
            ratingService.getReviews(productId).pipe(
              tapResponse(
                (reviews) => {
                  patchState(
                    store,
                    // Note `reviewDate` is used as a key
                    setEntities(reviews, { selectId: (r) => r.reviewDate })
                  );
                },
                () => {
                  // An example of dispatching Actions back into Global Store.
                  globalStore.dispatch(
                    reviewActions.reviewFetchError({
                      errorMessage: "Error fetching reviews",
                    })
                  );
                }
              )
            )
          )
        )
      ),
      submit: rxMethod<{ reviewer: string; reviewText: string }>(
        pipe(
          map(
            ({ reviewer, reviewText }): Review => ({
              productId: store.currentProductId()!,
              reviewer,
              reviewText,
              reviewDate: new Date().valueOf(),
            })
          ),
          tap((review) => {
            // Optimistically add a review to the list
            patchState(store, addEntity(review, { selectId: (r) => r.reviewDate }));
          }),
          concatMap((review) =>
            ratingService.postReview(review).pipe(
              tapResponse(
                () => {},
                () => {
                  // remove a review
                  patchState(store, removeEntity(review.reviewDate));
                  globalStore.dispatch(
                    reviewActions.reviewFetchError({
                      errorMessage: "Error submitting a review",
                    })
                  );
                }
              )
            )
          )
        )
      ),
    })
  ),
  withHooks({
    onInit(store) {
      store.fetchReviews(store.currentProductId());
    },
  })
);

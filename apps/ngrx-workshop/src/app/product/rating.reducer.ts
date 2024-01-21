import { ProductRating } from "@angular-monorepo/api-interfaces";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { ratingApiActions } from "./actions";
import { selectCurrentProductId } from "./product.selectors";

interface RatingState {
  ratings: EntityState<ProductRating>;
}

export const ratingAdapter: EntityAdapter<ProductRating> = createEntityAdapter({
  selectId: (productRating) => productRating.productId,
});

const initState: RatingState = {
  ratings: ratingAdapter.getInitialState(),
};

export const ratingFeature = createFeature({
  name: "rating",
  reducer: createReducer(
    initState,
    on(
      ratingApiActions.ratingsFetchedSuccess,
      ratingApiActions.setRatingSuccess,
      (state, { ratings }) => ({
        ...state,
        ratings: ratingAdapter.upsertMany(ratings, state.ratings),
      })
    ),
    on(ratingApiActions.getRatingSuccess, (state, { rating }) => {
      if (!rating) return state;
      return {
        ...state,
        ratings: ratingAdapter.upsertOne(rating, state.ratings),
      };
    })
  ),
  extraSelectors: ({ selectRatings }) => {
    const selectRatingsDictionary = createSelector(
      selectRatings,
      ratingAdapter.getSelectors().selectEntities
    );
    return {
      selectRatingsDictionary,
      selectCurrentRating: createSelector(
        selectRatingsDictionary,
        selectCurrentProductId,
        (ratings, id) => (id ? ratings[id] : undefined)
      ),
    };
  },
});

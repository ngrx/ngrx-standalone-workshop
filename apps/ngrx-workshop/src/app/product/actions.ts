import {
  BasicProduct,
  Product,
  ProductRating,
} from "@angular-monorepo/api-interfaces";
import { createActionGroup, props } from "@ngrx/store";

export const productApiActions = createActionGroup({
  source: "Product API",
  events: {
    productsFetchedSuccess: props<{ products: BasicProduct[] }>(),
    productsFetchedError: props<{ errorMessage: string }>(),

    singleProductFetchedSuccess: props<{ product: Product }>(),
    singleProductFetchedError: props<{ errorMessage: string }>(),
  },
});

export const ratingApiActions = createActionGroup({
  source: "Rating API",
  events: {
    ratingsFetchedSuccess: props<{ ratings: ProductRating[] }>(),
    ratingsFetchedError: props<{ errorMessage: string }>(),

    setRatingSuccess: props<{ ratings: ProductRating[] }>(),
    setRatingError: props<{ errorMessage: string }>(),

    getRatingSuccess: props<{ rating: ProductRating | undefined }>(),
    getRatingError: props<{ errorMessage: string }>(),
  },
});

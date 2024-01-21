import { createActionGroup, props } from "@ngrx/store";

export const reviewActions = createActionGroup({
  source: "Product Details Review",
  events: {
    reviewFetchError: props<{ errorMessage: string }>(),
    submitReviewError: props<{ errorMessage: string }>(),
  },
});

import { ProductRating } from "@angular-monorepo/api-interfaces";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const productDetailsActions = createActionGroup({
  source: "Product Details Page",
  events: {
    addToCart: props<{ productId: string }>(),
    pageOpened: emptyProps(),
    productRated: props<ProductRating>(),
  },
});

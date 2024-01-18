import { createActionGroup, props } from "@ngrx/store";

export const productDetailsActions = createActionGroup({
  source: "Product Details Page",
  events: {
    addToCart: props<{ productId: string }>(),
  },
});

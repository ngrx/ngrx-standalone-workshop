import { BasicProduct } from "@angular-monorepo/api-interfaces";
import { createActionGroup, props } from "@ngrx/store";

export const productApiActions = createActionGroup({
  source: "Product API",
  events: {
    productsFetchedSuccess: props<{ products: BasicProduct[] }>(),
    productsFetchedError: props<{ errorMessage: string }>(),
  },
});

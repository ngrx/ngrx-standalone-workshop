import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CartProduct } from "../../model/product";

export const cartDetailsActions = createActionGroup({
  source: "Cart Details Page",
  events: {
    pageOpened: emptyProps(),
    purchaseClicked: props<{ products: CartProduct[] }>(),
    removeProductClicked: props<{ productId: string }>(),
    removeAllClicked: emptyProps(),
  },
});

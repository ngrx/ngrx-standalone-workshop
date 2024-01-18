import { createActionGroup, emptyProps } from "@ngrx/store";

export const cartDetailsActions = createActionGroup({
  source: "Cart Details Page",
  events: {
    pageOpened: emptyProps(),
    purchaseSuccess: emptyProps(),
  },
});

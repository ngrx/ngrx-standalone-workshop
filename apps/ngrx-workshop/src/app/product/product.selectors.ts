import { createSelector } from "@ngrx/store";
import { selectRouterParam } from "../router/router.selectors";
import { productAdapter, productFeature } from "./product.reducer";

const { selectAll, selectEntities } = productAdapter.getSelectors();

export const selectProducts = createSelector(
  productFeature.selectProducts,
  selectAll
);

const selectProductsDictionary = createSelector(
  productFeature.selectProducts,
  selectEntities
);

export const selectCurrentProductId = selectRouterParam("productId");

export const selectCurrentProduct = createSelector(
  selectProductsDictionary,
  selectCurrentProductId,
  (products, id) => {
    if (id == null || !products) return undefined;
    return products[id];
  }
);

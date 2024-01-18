import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeature, createReducer, on } from "@ngrx/store";
import { ProductModel } from "../model/product";
import { productApiActions } from "./actions";

interface ProductState {
  products: EntityState<ProductModel>;
}

// If your entity's id property is different you can specify it during
// entity adapter creation.
export const productAdapter: EntityAdapter<ProductModel> =
  createEntityAdapter();

const initState: ProductState = {
  products: productAdapter.getInitialState(),
};

export const productFeature = createFeature({
  name: "product",
  reducer: createReducer(
    initState,
    on(productApiActions.productsFetchedSuccess, (state, { products }) => ({
      ...state,
      products: productAdapter.upsertMany(products, state.products),
    })),
    on(productApiActions.productsFetchedError, (state) => ({
      ...state,
    })),
    on(productApiActions.singleProductFetchedSuccess, (state, { product }) => ({
      ...state,
      products: productAdapter.upsertOne(product, state.products),
    }))
  ),
});

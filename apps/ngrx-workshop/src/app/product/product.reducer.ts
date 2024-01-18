import { createFeature, createReducer, on } from "@ngrx/store";
import { ProductModel } from "../model/product";
import { productApiActions } from "./actions";

export interface GlobalState {
  product: ProductState;
}

interface ProductState {
  products: ProductModel[] | undefined;
}

const initState: ProductState = {
  products: undefined,
};

export const productFeature = createFeature({
  name: "product",
  reducer: createReducer(
    initState,
    on(productApiActions.productsFetchedSuccess, (state, { products }) => ({
      ...state,
      products: [...products],
    })),
    on(productApiActions.productsFetchedError, (state) => ({
      ...state,
      products: [],
    }))
  ),
});

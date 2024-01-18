import { createReducer, on } from "@ngrx/store";
import { ProductModel } from "../model/product";
import { productApiActions } from "./actions";

export interface GlobalState {
  product: ProductState;
}

interface ProductState {
  products?: ProductModel[];
}

const initState: ProductState = {
  products: undefined,
};

export const productsReducer = createReducer(
  initState,
  on(productApiActions.productsFetchedSuccess, (state, { products }) => ({
    ...state,
    products: [...products],
  })),
  on(productApiActions.productsFetchedError, (state) => ({
    ...state,
    products: [],
  }))
);

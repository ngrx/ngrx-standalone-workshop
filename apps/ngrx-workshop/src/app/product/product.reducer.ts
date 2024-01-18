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
    })),
    on(productApiActions.singleProductFetchedSuccess, (state, { product }) => {
      const productsClone = state.products ? [...state.products] : [];
      const indexOfProduct = productsClone.findIndex(
        (p) => p.id === product.id
      );
      // Remove old one and replace with a single product fetched
      if (indexOfProduct < 0) {
        productsClone.push(product);
      } else {
        productsClone.splice(indexOfProduct, 1, product);
      }
      return {
        ...state,
        products: productsClone,
      };
    })
  ),
});

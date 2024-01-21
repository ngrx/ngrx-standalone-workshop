import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeature, createReducer, on } from "@ngrx/store";
import { ProductModel } from "../model/product";
import { productApiActions } from "./actions";
import { LoadingState, RequestStatus } from "../shared/request-status";
import { productsOpened } from "./product-list/actions";

interface ProductState {
  products: EntityState<ProductModel>;
  productsRequestStatus: RequestStatus;
}

// If your entity's id property is different you can specify it during
// entity adapter creation.
export const productAdapter: EntityAdapter<ProductModel> =
  createEntityAdapter();

const initState: ProductState = {
  products: productAdapter.getInitialState(),
  productsRequestStatus: LoadingState.IDLE,
};

export const productFeature = createFeature({
  name: "product",
  reducer: createReducer(
    initState,
    on(productsOpened, (state) => ({
      ...state,
      productsRequestStatus: LoadingState.PENDING,
    })),
    on(productApiActions.productsFetchedSuccess, (state, { products }) => ({
      ...state,
      products: productAdapter.upsertMany(products, state.products),
      productsRequestStatus: LoadingState.FULFILLED,
    })),
    on(productApiActions.productsFetchedError, (state, { errorMessage }) => ({
      ...state,
      productsRequestStatus: { errorMessage },
    })),
    on(productApiActions.singleProductFetchedSuccess, (state, { product }) => ({
      ...state,
      products: productAdapter.upsertOne(product, state.products),
    }))
  ),
});

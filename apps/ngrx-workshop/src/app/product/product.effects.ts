import { Injectable } from "@angular/core";
import  { concatLatestFrom } from "@ngrx/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, of } from "rxjs";
import {
  catchError,
  exhaustMap,
  filter,
  map,
  mergeMap,
  switchMap,
} from "rxjs/operators";

import { productApiActions } from "./actions";
import * as productListActions from "./product-list/actions";
import { ProductService } from "./product.service";
import { productDetailsActions } from "./product-details/actions";
import { Store } from "@ngrx/store";
import { selectCurrentProductId } from "./product.selectors";
import { cartActions } from "../cart/actions";

@Injectable()
export class ProductEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly store: Store
  ) {}

  fetchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productListActions.productsOpened),
      exhaustMap(() =>
        this.productService.getProducts().pipe(
          map((products) =>
            productApiActions.productsFetchedSuccess({ products })
          ),
          catchError(() =>
            of(
              productApiActions.productsFetchedError({
                errorMessage: "Error Fetching Products",
              })
            )
          )
        )
      )
    );
  });

  fetchCurrentProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productDetailsActions.pageOpened),
      concatLatestFrom(() =>
        this.store
          .select(selectCurrentProductId)
          .pipe(filter((id): id is string => id != null))
      ),
      switchMap(([, id]) =>
        this.productService.getProduct(id).pipe(
          map((product) =>
            productApiActions.singleProductFetchedSuccess({ product })
          ),
          catchError(() =>
            of(
              productApiActions.singleProductFetchedError({
                errorMessage: "Error Fetching Single Product",
              })
            )
          )
        )
      )
    );
  });

  fetchCartDetailsProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cartActions.fetchCartItemsSuccess),
      switchMap(({ cartItems }) =>
        from(cartItems).pipe(
          mergeMap(({ productId }) =>
            this.productService.getProduct(productId).pipe(
              map((product) =>
                productApiActions.singleProductFetchedSuccess({ product })
              ),
              catchError(() =>
                of(
                  productApiActions.singleProductFetchedError({
                    errorMessage: "Error Fetching Single Product",
                  })
                )
              )
            )
          )
        )
      )
    );
  });
}

import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs";

import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { CartProduct } from "../../model/product";
import { CartService } from "../cart.service";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AsyncPipe, CommonModule, CurrencyPipe } from "@angular/common";
import { createSelector, Store } from "@ngrx/store";
import { selectCartProducts, selectCartTotal } from "../cart.selectors";
import { cartDetailsActions } from "./actions";

export const cartDetailsVm = createSelector({
  products: selectCartProducts,
  total: selectCartTotal,
});

@Component({
  selector: "ngrx-workshop-cart-details",
  templateUrl: "./cart-details.component.html",
  styleUrls: ["./cart-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CurrencyPipe,
    AsyncPipe,
  ],
})
export class CartDetailsComponent {
  cartDetailsVm$: Observable<{
    products?: CartProduct[];
    total?: number;
  }> = this.store.select(cartDetailsVm);

  constructor(
    private readonly cartService: CartService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly store: Store
  ) {
    this.store.dispatch(cartDetailsActions.pageOpened());
  }

  removeOne(id: string) {
    this.cartService.removeProduct(id);
  }

  removeAll() {
    this.cartService.removeAll();
  }

  purchase(products: CartProduct[]) {
    this.cartService
      .purchase(
        products.map(({ id, quantity }) => ({ productId: id, quantity }))
      )
      // 👇 really important not to forget to subscribe
      .subscribe((isSuccess) => {
        if (isSuccess) {
          this.store.dispatch(cartDetailsActions.purchaseSuccess());
          this.router.navigateByUrl("");
        } else {
          this.snackBar.open("Purchase error", "Error", {
            duration: 2500,
          });
        }
      });
  }
}

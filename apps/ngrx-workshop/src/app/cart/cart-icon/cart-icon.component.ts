import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectCartItemsCount } from "../cart.selectors";

import { CartService } from "../cart.service";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "ngrx-workshop-cart",
  styleUrls: ["./cart-icon.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, MatIconModule, MatButtonModule, RouterLink],
  template: `
    <button type="button" mat-icon-button routerLink="cart">
      <mat-icon>shopping_cart</mat-icon>
      <span class="counter-background"></span>
      <span class="counter">{{ (cartItemsCounter$ | async) || 0 }}</span>
    </button>
  `,
})
export class CartIconComponent {
  cartItemsCounter$ = this.store.select(selectCartItemsCount);

  constructor(
    private readonly cartService: CartService,
    private readonly store: Store
  ) {
    this.cartService.getCartProducts();
  }
}

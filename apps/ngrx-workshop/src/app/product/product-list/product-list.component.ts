import { Component } from "@angular/core";

import { StarsComponent } from "../../common/stars/stars.component";
import { SpinnerComponent } from "../../common/spinner/spinner.component";
import { RouterLink } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { AsyncPipe, CommonModule } from "@angular/common";
import { Store, createSelector } from "@ngrx/store";
import { selectProducts } from "../product.selectors";
import * as actions from "./actions";
import { productFeature } from "../product.reducer";
import { ratingFeature } from "../rating.reducer";
import { MatProgressBarModule } from "@angular/material/progress-bar";

const productListVm = createSelector({
  products: selectProducts,
  productsRequestStatus: productFeature.selectProductsRequestStatus,
  customerRatings: ratingFeature.selectRatingsDictionary,
});

@Component({
  selector: "ngrx-workshop-home",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  imports: [
    CommonModule,
    MatCardModule,
    StarsComponent,
    RouterLink,
    SpinnerComponent,
    AsyncPipe,
    MatProgressBarModule,
  ],
})
export class ProductListComponent {
  readonly productListVm$ = this.store.select(productListVm);

  constructor(private readonly store: Store) {
    this.store.dispatch(actions.productsOpened());
  }
}

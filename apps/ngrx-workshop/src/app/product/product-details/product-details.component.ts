import { AsyncPipe, CommonModule, CurrencyPipe, Location } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Rating } from "@angular-monorepo/api-interfaces";

import { Store, createSelector } from "@ngrx/store";
import { productDetailsActions } from "./actions";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { StarsComponent } from "../../common/stars/stars.component";
import { SpinnerComponent } from "../../common/spinner/spinner.component";
import { MatCardModule } from "@angular/material/card";
import { ReviewsComponent } from "./reviews/reviews.component";
import { selectCurrentProduct } from "../product.selectors";
import { ratingFeature } from "../rating.reducer";

const productDetailsVm = createSelector({
  product: selectCurrentProduct,
  customerRating: ratingFeature.selectCurrentRating,
});

@Component({
  selector: "ngrx-workshop-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonModule,
    StarsComponent,
    MatProgressBarModule,
    SpinnerComponent,
    MatCardModule,
    ReviewsComponent,
    AsyncPipe,
    CurrencyPipe,
  ],
})
export class ProductDetailsComponent {
  readonly vm$ = this.store.select(productDetailsVm);

  constructor(
    private readonly store: Store,
    private readonly location: Location
  ) {
    this.store.dispatch(productDetailsActions.pageOpened());
  }

  setRating(productId: string, rating: Rating) {
    this.store.dispatch(
      productDetailsActions.productRated({ productId, rating })
    );
  }

  addToCart(productId: string) {
    this.store.dispatch(productDetailsActions.addToCart({ productId }));
  }

  back() {
    this.location.back();
  }
}

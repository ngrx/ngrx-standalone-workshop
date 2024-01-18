import { Component, OnInit } from "@angular/core";
import { map, Observable, shareReplay } from "rxjs";

import { Rating } from "@angular-monorepo/api-interfaces";
import { RatingService } from "../rating.service";

import { ProductModel } from "../../model/product";
import { StarsComponent } from "../../common/stars/stars.component";
import { SpinnerComponent } from "../../common/spinner/spinner.component";
import { RouterLink } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { AsyncPipe, CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { GlobalState } from "../product.reducer";
import { selectProducts } from "../product.selectors";
import * as actions from "./actions";

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
  ],
})
export class ProductListComponent implements OnInit {
  products$?: Observable<ProductModel[] | undefined> =
    this.store.select(selectProducts);
  customerRatings$?: Observable<{ [productId: string]: Rating }>;

  constructor(
    private readonly store: Store<GlobalState>,
    private readonly ratingService: RatingService
  ) {
    this.store.dispatch(actions.productsOpened());
  }

  ngOnInit() {
    this.customerRatings$ = this.ratingService.getRatings().pipe(
      map((ratingsArray) =>
        // Convert from Array to Indexable.
        ratingsArray.reduce(
          (acc: { [productId: string]: Rating }, ratingItem) => {
            acc[ratingItem.productId] = ratingItem.rating;
            return acc;
          },
          {}
        )
      ),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      })
    );
  }
}

import { Component, OnInit } from "@angular/core";
import { map, Observable, shareReplay } from "rxjs";

import { Rating } from "@angular-monorepo/api-interfaces";
import { RatingService } from "../rating.service";

import { ProductModel } from "../../model/product";
import { ProductService } from "../product.service";
import { StarsComponent } from "../../common/stars/stars.component";
import { SpinnerComponent } from "../../common/spinner/spinner.component";
import { RouterLink } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { AsyncPipe, CommonModule } from "@angular/common";

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
  products$?: Observable<ProductModel[]>;
  customerRatings$?: Observable<{ [productId: string]: Rating }>;

  constructor(
    private readonly productService: ProductService,
    private readonly ratingService: RatingService
  ) {}

  ngOnInit() {
    this.products$ = this.productService.getProducts();

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

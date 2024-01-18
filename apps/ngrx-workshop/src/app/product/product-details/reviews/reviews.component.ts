import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { AsyncPipe, CommonModule } from "@angular/common";
import { RatingService } from "../../rating.service";
import { BehaviorSubject, switchMap } from "rxjs";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "ngrx-workshop-reviews",
  templateUrl: "./reviews.component.html",
  styleUrl: "./reviews.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    AsyncPipe,
  ],
})
export class ReviewsComponent implements OnInit {
  @Input() productId!: string;

  readonly reviewsRefresh$ = new BehaviorSubject<void>(undefined);

  readonly reviews$ = this.reviewsRefresh$.pipe(
    switchMap(() => this.ratingService.getReviews(this.productId))
  );

  constructor(private readonly ratingService: RatingService) {}

  ngOnInit() {
    this.reviewsRefresh$.next();
  }

  submit(review: { reviewer: string; reviewText: string }) {
    this.ratingService
      .postReview({
        productId: this.productId,
        ...review,
      })
      .subscribe(() => {
        this.reviewsRefresh$.next();
      });
  }
}

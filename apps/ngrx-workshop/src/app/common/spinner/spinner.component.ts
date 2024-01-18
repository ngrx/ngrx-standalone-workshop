import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "ngrx-workshop-spinner",
  styles: [
    `
      :host {
        position: fixed;
        margin: 40vh 45vw;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatProgressSpinnerModule],
  template: `<mat-spinner></mat-spinner>`,
})
export class SpinnerComponent {}

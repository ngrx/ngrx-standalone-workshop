import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CartIconComponent } from "./cart/cart-icon/cart-icon.component";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "ngrx-workshop-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [MatToolbarModule, RouterOutlet, RouterLink, CartIconComponent],
})
export class AppComponent {}

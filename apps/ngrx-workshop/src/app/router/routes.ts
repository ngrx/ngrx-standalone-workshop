import { Routes } from "@angular/router";
import { CartDetailsComponent } from "../cart/cart-details/cart-details.component";
import { ProductDetailsComponent } from "../product/product-details/product-details.component";
import { ProductListComponent } from "../product/product-list/product-list.component";

export const routes: Routes = [
  { path: "details/:productId", component: ProductDetailsComponent },
  { path: "cart", component: CartDetailsComponent },
  { path: "", component: ProductListComponent, pathMatch: "full" },
];

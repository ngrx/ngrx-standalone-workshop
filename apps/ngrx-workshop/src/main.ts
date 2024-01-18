import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { routes } from "./app/router/routes";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { productsReducer } from "./app/product/product.reducer";
import { ProductEffects } from "./app/product/product.effects";
import * as errorEffects from "./app/error.effects";
import { provideEffects } from "@ngrx/effects";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideStore({ product: productsReducer }),
    provideEffects(ProductEffects, errorEffects),
    provideStoreDevtools(),
  ],
});

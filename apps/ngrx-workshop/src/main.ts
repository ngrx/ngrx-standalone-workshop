import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { routes } from "./app/router/routes";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideState, provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { productFeature } from "./app/product/product.reducer";
import { ProductEffects } from "./app/product/product.effects";
import * as errorEffects from "./app/error.effects";
import * as cartEffects from "./app/cart/cart.effects";
import * as ratingEffects from "./app/product/rating.effects";
import { provideEffects } from "@ngrx/effects";
import { CART_FEATURE_KEY, cartReducer } from "./app/cart/cart.reducer";
import { ROUTER_FEATURE_KEY } from "./app/router/router.selectors";
import { provideRouterStore, routerReducer } from "@ngrx/router-store";
import { ratingFeature } from "./app/product/rating.reducer";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideStore({}),
    provideState(productFeature),
    provideState(ratingFeature),
    provideEffects(ProductEffects, errorEffects, cartEffects, ratingEffects),
    provideState(CART_FEATURE_KEY, cartReducer),
    provideState(ROUTER_FEATURE_KEY, routerReducer),
    provideRouterStore(),
    provideStoreDevtools(),
  ],
});

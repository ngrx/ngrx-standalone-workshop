import { BasicProduct, Product } from '@angular-monorepo/api-interfaces';

export interface CartProduct extends BasicProduct {
  quantity: number;
}

export interface ProductModel
  extends BasicProduct,
    Partial<Pick<Product, 'description'>> {}

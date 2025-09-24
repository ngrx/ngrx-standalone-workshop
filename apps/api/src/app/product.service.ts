import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { BasicProduct, Product } from "@angular-monorepo/api-interfaces";
import { data } from "@angular-monorepo/mock-data";

function stripDescription(originalData: Product[]): BasicProduct[] {
  // Remove `description` from the object.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return originalData.map(({ description, ...product }) => product);
}

@Injectable()
export class ProductService {
  getProductList(): BasicProduct[] {
    if (Math.random() < 0.25) {
      throw new HttpException(
        "products failed",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return stripDescription(data);
  }

  getProduct(id: string): Product {
    const product = data.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} is not found`);
    }
    return product;
  }
}

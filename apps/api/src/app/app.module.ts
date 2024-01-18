import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CartService } from './cart.service';
import { ProductService } from './product.service';
import { RatingService } from './rating.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ProductService, CartService, RatingService],
})
export class AppModule {}

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BuyProductDto } from './dto/buy-product.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly catalogsService: ProductsService) {}

    @Post('/buyProduct')
    async buyProduct(@Body() dto: BuyProductDto) {
        return this.catalogsService.butProduct(dto);
    }
}

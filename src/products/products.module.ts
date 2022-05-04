import { Asset } from 'src/assets/entities/assets.entity';
import { Catalog } from 'src/catalogs/entities/catalogs.entity';
import { Product } from 'src/products/entities/products.entity';
import { User } from 'src/users/entities/users.entity';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
    imports: [SequelizeModule.forFeature([Catalog, Asset, Product, User])],
    providers: [ProductsService],
    controllers: [ProductsController],
})
export class ProductsModule {}

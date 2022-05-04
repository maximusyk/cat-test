import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AssetsModule } from '../assets/assets.module';
import { CatalogsModule } from '../catalogs/catalogs.module';
import { UsersModule } from '../users/users.module';
import { Product } from './entities/products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
    imports: [
        AssetsModule,
        CatalogsModule,
        SequelizeModule.forFeature([Product]),
        UsersModule,
    ],
    providers: [ProductsService],
    controllers: [ProductsController],
})
export class ProductsModule {}

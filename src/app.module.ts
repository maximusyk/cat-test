import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AssetsModule } from './assets/assets.module';
import { Asset } from './assets/entities/assets.entity';
import { CatalogsModule } from './catalogs/catalogs.module';
import { Catalog } from './catalogs/entities/catalogs.entity';
import { Product } from './products/entities/products.entity';
import { ProductsModule } from './products/products.module';
import { User } from './users/entities/users.entity';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env' }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                dialect: config.get('DB_DIALECT'),
                host: config.get('DB_HOST'),
                port: config.get('DB_PORT'),
                username: config.get('DB_USER'),
                password: config.get('DB_PASSWORD'),
                database: config.get('DB_NAME'),
                models: [Asset, Catalog, Product, User],
                autoLoadModels: true,
            }),
        }),
        AssetsModule,
        CatalogsModule,
        ProductsModule,
        UsersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

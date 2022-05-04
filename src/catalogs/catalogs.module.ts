import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CatalogsController } from './catalogs.controller';
import { CatalogsService } from './catalogs.service';
import { Catalog } from './entities/catalogs.entity';

@Module({
    imports: [SequelizeModule.forFeature([Catalog])],
    controllers: [CatalogsController],
    providers: [CatalogsService],
    exports: [CatalogsService],
})
export class CatalogsModule {}

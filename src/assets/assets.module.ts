import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { Asset } from './entities/assets.entity';

@Module({
    imports: [SequelizeModule.forFeature([Asset])],
    providers: [AssetsService],
    controllers: [AssetsController],
    exports: [AssetsService],
})
export class AssetsModule {}

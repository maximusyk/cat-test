import { Body, HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateCatalogDto } from './dto/create-catalog.dto';
import { Catalog } from './entities/catalogs.entity';

@Injectable()
export class CatalogsService {
    constructor(
        @InjectModel(Catalog)
        private readonly catalogRepository: typeof Catalog,
    ) {}

    async create(catalogDto: CreateCatalogDto) {
        try {
            const catalog = await this.catalogRepository.create(catalogDto);
            return {
                id: catalog.id,
                name: catalog.name,
                description: catalog.description,
                imageUrl: catalog.url,
                price: {
                    cost1: catalog.cost1,
                    cost2: catalog.cost2,
                    cost3: catalog.cost3,
                },
                req: {
                    req1: catalog.req1,
                    req2: catalog.req2,
                    req3: catalog.req3,
                },
            };
        } catch (error) {
            throw new HttpException(
                error.message,
                error?.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getOne(id: number) {
        try {
            const catalog = await this.catalogRepository.findOne({
                where: { id },
                include: { all: true },
            });

            if (!catalog)
                throw new HttpException(
                    'Catalog with provided id not found',
                    HttpStatus.NOT_FOUND,
                );

            return catalog;
        } catch (error) {
            throw new HttpException(
                {
                    success: false,
                    error: { errorMessage: error.message },
                },
                error?.status || HttpStatus.BAD_REQUEST,
            );
        }
    }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Asset } from '../assets/entities/assets.entity';
import { Catalog } from '../catalogs/entities/catalogs.entity';
import { User } from '../users/entities/users.entity';
import { BuyProductDto } from './dto/buy-product.dto';
import { Product } from './entities/products.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product)
        private readonly productRepository: typeof Product,
        @InjectModel(Catalog)
        private readonly catalogRepository: typeof Catalog,
        @InjectModel(Asset)
        private readonly assetRepository: typeof Asset,
        @InjectModel(User)
        private readonly userRepository: typeof User,
    ) {}

    async butProduct({ id, address }: BuyProductDto) {
        try {
            const actualCatalog = await this.catalogRepository.findOne({
                where: { id },
                include: { all: true },
            });

            if (!actualCatalog)
                throw new HttpException(
                    'Catalog with provided id not found',
                    HttpStatus.NOT_FOUND,
                );

            const actualUser = await this.userRepository.findOne({
                where: { address },
                include: { all: true },
            });
            if (!actualUser)
                throw new HttpException(
                    'User with provided id not found',
                    HttpStatus.NOT_FOUND,
                );

            for (let index = 1; index <= 3; index++) {
                if (
                    !actualUser[`cash${index}`] ||
                    (actualUser[`cash${index}`] &&
                        actualUser[`cash${index}`] <=
                            actualCatalog[`cost${index}`])
                ) {
                    throw new HttpException(
                        `User's cash${index} is too small`,
                        HttpStatus.BAD_REQUEST,
                    );
                }
            }

            const actualAsset = actualUser.assets || [];

            for (let index = 1; index <= 3; index++) {
                if (
                    actualCatalog[`req${index}`] &&
                    actualAsset.some(({ type }) => type === index)
                ) {
                    if (
                        !actualAsset.some(
                            ({ level }) =>
                                level >= actualCatalog[`req${index}`],
                        )
                    ) {
                        throw new HttpException(
                            `User's asset with type ${index} level is less then req${index} - ${
                                actualCatalog[`req${index}`]
                            }`,
                            HttpStatus.BAD_REQUEST,
                        );
                    }
                } else {
                    throw new HttpException(
                        `User doesn't own asset with required type ${index}`,
                        HttpStatus.BAD_REQUEST,
                    );
                }
            }

            const updatedUser = await actualUser.update({
                cash1: actualUser.cash1 - actualCatalog.cost1,
                cash2: actualUser.cash2 - actualCatalog.cost2,
                cash3: actualUser.cash3 - actualCatalog.cost3,
            });

            const newProduct = await this.productRepository.create({ address });

            await newProduct.$add('userAddress', updatedUser.address);

            return {
                success: true,
                data: {
                    resources: {
                        cash1: updatedUser.cash1,
                        cash2: updatedUser.cash2,
                        cash3: updatedUser.cash3,
                    },
                },
            };
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

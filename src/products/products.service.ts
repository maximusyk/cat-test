import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { AssetsService } from '../assets/assets.service';
import { CatalogsService } from '../catalogs/catalogs.service';
import { UsersService } from '../users/users.service';
import { BuyProductDto, CreateProductDto } from './dto';
import { Product } from './entities/products.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product)
        private readonly productsRepository: typeof Product,
        private readonly assetsService: AssetsService,
        private readonly catalogsService: CatalogsService,
        private readonly usersService: UsersService,
    ) {}

    async create({ userAddress, ...restDto }: CreateProductDto) {
        const product = await this.productsRepository.create(restDto);
        await product.update({ userAddress: userAddress.address });
        return product;
    }

    async buyProduct({ id, address }: BuyProductDto) {
        try {
            const actualCatalog = await this.catalogsService.getOne(id);

            const actualUser = await this.usersService.getOne(address);

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

            const actualAsset = await this.assetsService.getByUserAddress(
                address,
            );

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

            const newProduct = await this.create({
                address,
                userAddress: updatedUser,
            });

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

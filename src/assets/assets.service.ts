import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Asset } from './entities/assets.entity';

@Injectable()
export class AssetsService {
    constructor(@InjectModel(Asset) private assetRepository: typeof Asset) {}

    async getByUserAddress(userAddress: string) {
        try {
            const user = await this.assetRepository.findAll({
                where: { userAddress },
                include: { all: true },
            });

            if (!user)
                throw new HttpException(
                    'User with provided id not found',
                    HttpStatus.NOT_FOUND,
                );

            return user;
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

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async create(dto: CreateUserDto) {
        return await this.userRepository.create(dto);
    }

    async getOne(address: string) {
        try {
            const user = await this.userRepository.findOne({
                where: { address },
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

    async update(dto) {
        try {
            const user = await this.userRepository.findOne({
                where: { address: dto.address },
                include: { all: true },
            });

            if (!user)
                throw new HttpException(
                    'User with provided id not found',
                    HttpStatus.NOT_FOUND,
                );

            const updatedUser = await user.update({ ...dto });

            return updatedUser;
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

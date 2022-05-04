import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../users/entities/users.entity';

export class CreateProductDto {
    @ApiProperty()
    address: string;

    @ApiProperty()
    id: number;

    @ApiProperty()
    userAddress: User;
}

import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../users/entities/users.entity';

export class CreateProductDto {
    @ApiProperty()
    id?: number;

    @ApiProperty()
    address: string;

    @ApiProperty()
    userAddress?: User;
}

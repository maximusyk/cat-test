import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../users/entities/users.entity';

export class CreateAssetDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    type: number;

    @ApiProperty()
    level: number;

    @ApiProperty()
    userAddress: User;
}

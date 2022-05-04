import { ApiProperty, ApiTags } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    address: string;

    @ApiProperty()
    cost1: number;

    @ApiProperty()
    cost2: number;

    @ApiProperty()
    cost3: number;
}

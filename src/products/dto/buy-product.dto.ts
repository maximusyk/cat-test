import { ApiProperty } from '@nestjs/swagger';

export class BuyProductDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    address: string;
}

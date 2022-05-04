import { ApiProperty } from '@nestjs/swagger';

export class CreateCatalogDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    url: string;

    @ApiProperty()
    cost1: number;

    @ApiProperty()
    cost2: number;

    @ApiProperty()
    cost3: number;

    @ApiProperty()
    req1: number;

    @ApiProperty()
    req2: number;

    @ApiProperty()
    req3: number;

    @ApiProperty()
    category: number;
}

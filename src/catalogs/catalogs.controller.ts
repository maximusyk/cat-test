import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CatalogsService } from './catalogs.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';

@ApiTags('Catalogs')
@Controller('catalogs')
export class CatalogsController {
    constructor(private readonly catalogsService: CatalogsService) {}

    // @ApiBearerAuth()
    // @Auth([], [])
    @Post()
    create(@Body() createCatalogDto: CreateCatalogDto) {
        return this.catalogsService.create(createCatalogDto);
    }
}

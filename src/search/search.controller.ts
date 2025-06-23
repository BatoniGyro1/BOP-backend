import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateSearchDto } from './dto/create-search.dto';


@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}


  @Get('/barbershop')
  findBarberShop(@Query() createSearchDto: CreateSearchDto) {
    return this.searchService.findBarber(createSearchDto);
  }

  @Get('/barber')
  findBarber(@Query() createSearchDto: CreateSearchDto) {
    return this.searchService.findBarber(createSearchDto)
  }

}

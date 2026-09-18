import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { RequestService } from './request.service.js';
import { CreateRequestDto } from './create-request.dto.js';
import { QueryFiltersDto } from './filters/query-filters.dto.js';

@Controller('solicitudes')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get()
  getRequests(@Query() filters: QueryFiltersDto) {
    return this.requestService.getRequests(
      filters.limit,
      filters.page,
      filters.status,
    );
  }

  @Get(':id')
  getRequestById() {}

  @Post()
  createRequest(@Body() body: CreateRequestDto) {
    try {
      return this.requestService.processRequest(body);
    } catch (error) {
      throw new Error('Error al procesar la solicitud');
    }
  }
}

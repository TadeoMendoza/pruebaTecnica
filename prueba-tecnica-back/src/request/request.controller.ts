import { Controller, Post, Get, Body } from '@nestjs/common';
import { RequestService } from './request.service.js';
import { CreateRequestDto } from './create-request.dto.js';

@Controller('solicitudes')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get()
  getRequests(): string {
    return this.requestService.getRequests();
  }
  @Post()
  createRequest(@Body() body: CreateRequestDto) {
    try {
      return this.requestService.processRequest(body);
    } catch (error) {
      throw new Error('Error al procesar la solicitud');
    }
  }
}

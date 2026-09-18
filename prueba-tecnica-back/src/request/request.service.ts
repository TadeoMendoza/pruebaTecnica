import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './create-request.dto.js';

@Injectable()
export class RequestService {
  getRequests(): string {
    return 'Obteniendo solicitudes';
  }

  processRequest(data: CreateRequestDto) {
    return {
      message: 'Solicitud procesada correctamente',
      solicitante: `${data.name} ${data.lastname}`,
      meses: data.months,
    };
  }
}

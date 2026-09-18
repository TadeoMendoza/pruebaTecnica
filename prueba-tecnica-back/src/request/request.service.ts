import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './create-request.dto.js';

@Injectable()
export class RequestService {
  getRequests(): string {
    return 'Obteniendo solicitudes';
  }

  processRequest(data: CreateRequestDto) {
    const annualRate = 0.24;
    const monthlyRate = annualRate / 12;
    const amount = data.amount;
    const months = data.months;
    const monthlyPayment =
      amount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));
    const parsedMonthlyPayment = +monthlyPayment.toFixed(2);
    return {
      message: 'Solicitud procesada correctamente',
      solicitante: `${data.name} ${data.lastname}`,
      meses: data.months,
      cuota_mensual: parsedMonthlyPayment,
    };
  }
}

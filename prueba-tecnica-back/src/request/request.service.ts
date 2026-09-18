import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './create-request.dto.js';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService) {}
  getRequests(): string {
    return 'Obteniendo solicitudes';
  }

  private calculateMonthlyPayment(amount: number, months: number): number {
    const annualRate = 0.24;
    const monthlyRate = annualRate / 12;
    const monthlyPayment =
      amount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));
    const parsedMonthlyPayment = +monthlyPayment.toFixed(2);
    return parsedMonthlyPayment;
  }

  async processRequest(data: CreateRequestDto) {
    try {
      const newRequest = await this.prisma.request.create({
        data: {
          name: data.name,
          lastname: data.lastname,
          dni: data.dni,
          email: data.email,
          phone: data.phone,
          amount: data.amount,
          months: data.months,
          monthlyPayment: this.calculateMonthlyPayment(
            data.amount,
            data.months,
          ),
        },
      });
      return {
        message: 'Solicitud procesada correctamente',
        request: newRequest,
      };
    } catch (error) {
      throw new Error('Error al procesar la solicitud');
    }
  }
}

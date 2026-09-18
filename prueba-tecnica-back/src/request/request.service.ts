import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './create-request.dto.js';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, RequestStatus } from '@prisma/client/wasm';
@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService) {}

  async getRequests(limit: number, page: number, status?: string) {
    const where: Prisma.requestWhereInput = status
      ? { status: status as RequestStatus }
      : {};

    const [results, total] = await Promise.all([
      this.prisma.request.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.request.count({ where }),
    ]);
    const data = {
      results: results,
      total: total,
      pages: Math.ceil(total / limit),
    };
    return data;
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

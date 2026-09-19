import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './create-request.dto.js';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, RequestStatus } from '@prisma/client/wasm';
@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService) { }

  async getRequests(limit: number, page: number, status?: string) {
    const where: Prisma.requestWhereInput = status
      ? { status: status as RequestStatus }
      : {};

    const [results, total] = await Promise.all([
      this.prisma.request.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.request.count({ where }),
    ]);
    const data = {
      results: results,
      total: total,
      pages: Math.ceil(total / limit),
    };
    return {
      data,
      status: 200
    };
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
        request: {
          monthlyPayment: this.calculateMonthlyPayment(
            data.amount,
            data.months,
          ),
        },
        status: 201
      };
    } catch (error) {
      throw new Error('Error al procesar la solicitud');
    }
  }

  async updateStatus(id: number, status: string) {
    try {
      const updatedRequest = await this.prisma.request.update({
        where: { id },
        data: { status: status as RequestStatus },
      });

      return {
        message: 'Solicitud actualizada correctamente',
        status: 204
      };
    } catch (error) {
      throw new Error('Error al actualizar la solicitud');
    }
  }
}

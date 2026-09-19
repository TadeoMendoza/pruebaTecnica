import { Test, TestingModule } from '@nestjs/testing';
import { RequestService } from './request.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('RequestService - Cálculo de Cuota', () => {
  let service: RequestService;

  beforeEach(async () => {
    process.env.ANNUAL_RATE = '0.24';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestService,
        // Hacemos un mock vacío de Prisma ya que no vamos a usar DB, solo la fórmula matemática
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RequestService>(RequestService);
  });

  describe('calculateMonthlyPayment (Fórmula Francesa)', () => {
    it('Debe calcular la cuota de S/ 283.68 para P=3000 y n=12', () => {
      // Como el método es privado, se usa notación de corchetes para acceder en TS
      const cuota = service['calculateMonthlyPayment'](3000, 12);
      expect(cuota).toBe(283.68);
    });

    it('Debe calcular la cuota correctamente para montos límites (1000) y plazos límites (6)', () => {
      const cuota = service['calculateMonthlyPayment'](1000, 6);
      expect(cuota).toBe(178.53);
    });

    it('Debe calcular la cuota correctamente para montos máximos (10000) y plazos máximos (24)', () => {
      const cuota = service['calculateMonthlyPayment'](10000, 24);
      expect(cuota).toBe(528.71);
    });

    it('Debe calcular la cuota correctamente para montos medios con un plazo de 18 meses', () => {
      const cuota = service['calculateMonthlyPayment'](5000, 18);
      // P=5000, n=18, i=0.02 => Cuota = 5000 * (0.02 * 1.02^18) / (1.02^18 - 1) = ~333.51
      expect(cuota).toBe(333.51);
    });
  });
});

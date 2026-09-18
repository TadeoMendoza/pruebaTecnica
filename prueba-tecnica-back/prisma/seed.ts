import { PrismaClient, RequestStatus } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.request.deleteMany();

  await prisma.request.createMany({
    data: [
      {
        name: 'Juan',
        lastname: 'Pérez',
        dni: '12345678',
        email: 'juan.perez@example.com',
        phone: '987654321',
        amount: 3000.0,
        months: 12,
        monthlyPayment: 283.68,
        status: RequestStatus.PENDING,
      },
      {
        name: 'María',
        lastname: 'Gómez',
        dni: '87654321',
        email: 'maria.gomez@example.com',
        phone: '912345678',
        amount: 5000.0,
        months: 18,
        monthlyPayment: 334.45,
        status: RequestStatus.APPROVED,
      },
      {
        name: 'Carlos',
        lastname: 'Díaz',
        dni: '45678901',
        email: 'carlos.diaz@example.com',
        phone: '998877665',
        amount: 1500.0,
        months: 6,
        monthlyPayment: 267.75,
        status: RequestStatus.REJECTED,
      },
    ],
  });

  console.log('Seed ejecutado con éxito');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

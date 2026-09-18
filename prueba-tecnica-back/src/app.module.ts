import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { RequestController } from './request/request.controller.js';
import { RequestService } from './request/request.service.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'prueba-tecnica-back',
    }),
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class AppModule {}

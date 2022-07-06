// Nestjs
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controller
import { DeliveryController } from './controllers/delivery.controller';

// Repository
import { DeliveryRepository } from './repositories/delivery.repository';
import { DeliveryHistoryRepository } from './repositories/delivery-history.repository';

// Service
import { DeliveryService } from './services/delivery.service';
import { DeliveryHistoryService } from './services/delivery-history.service';

// Subscriber
import { DeliverySubscriber } from './subscribers/delivery.subscriber';

// Main section
@Module({
  imports: [TypeOrmModule.forFeature([DeliveryRepository, DeliveryHistoryRepository])],
  controllers: [DeliveryController],
  exports: [DeliveryService, DeliveryHistoryService],
  providers: [DeliveryService, DeliveryHistoryService, DeliverySubscriber],
})
export class DeliveryModule {}

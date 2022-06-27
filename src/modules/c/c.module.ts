// Nestjs
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Controller
import { CController } from './controllers/c.controller';
// Repository
import { CRepository } from './repositories/c.repository';
// Service
import { CService } from './services/c.service';
// Subscriber
import { CSubscriber } from './subscribers/c.subscriber';
// Main section
@Module({
  imports: [TypeOrmModule.forFeature([CRepository])],
  controllers: [CController],
  exports: [CService],
  providers: [CService, CSubscriber],
})
export class CModule {}

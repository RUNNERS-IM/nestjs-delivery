// Nestjs
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Module
import { SharedModule } from '../../shared/shared.module';
// Controller
import { TestController } from './controllers/test.controller';
// Repository
import { TestRepository } from './repositories/test.repository';
// Service
import { TestService } from './services/test.service';
// Subscriber
import { TestSubscriber } from './subscribers/test.subscriber';
// Main section
@Module({
  imports: [TypeOrmModule.forFeature([TestRepository]), SharedModule],
  controllers: [TestController],
  exports: [TestService],
  providers: [TestService, TestSubscriber],
})
export class TestModule {}

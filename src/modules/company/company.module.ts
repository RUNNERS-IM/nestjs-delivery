// Nestjs
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controller
import { CompanyController } from './controllers/company.controller';

// Repository
import { CompanyRepository } from './repositories/company.repository';

// Service
import { CompanyService } from './services/company.service';

// Subscriber
import { CompanySubscriber } from './subscribers/company.subscriber';

// Main section
@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository])],
  controllers: [CompanyController],
  exports: [CompanyService],
  providers: [CompanyService, CompanySubscriber],
})
export class CompanyModule {}

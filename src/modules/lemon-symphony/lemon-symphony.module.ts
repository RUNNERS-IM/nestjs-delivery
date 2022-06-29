// Nestjs
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controller
import { LemonSymphonyController } from './controllers/lemon-symphony.controller';
import { LemonController } from './controllers/lemon.controller';

// Repository
import { LemonSymphonyRepository } from './repositories/lemon-symphony.repository';
import { LemonRepository } from './repositories/lemon.repository';

// Service
import { LemonSymphonyService } from './services/lemon-symphony.service';
import { LemonService } from './services/lemon.service';

// Subscriber
import { LemonSymphonySubscriber } from './subscribers/lemon-symphony.subscriber';
import { LemonSubscriber } from './subscribers/lemon.subscriber';

// Main section
@Module({
  imports: [TypeOrmModule.forFeature([LemonSymphonyRepository, LemonRepository])],
  controllers: [LemonSymphonyController, LemonController],
  exports: [LemonSymphonyService, LemonService],
  providers: [LemonSymphonyService, LemonService, LemonSymphonySubscriber, LemonSubscriber],
})
export class LemonSymphonyModule {}

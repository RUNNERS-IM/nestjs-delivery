// Nestjs
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

// Service
import { SweetTrackerService } from './sweet-tracker.service';

// Main section
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private sweetTrackerService: SweetTrackerService) {}

  @Cron(CronExpression.EVERY_2_HOURS, {
    name: 'delivery',
    timeZone: 'Asia/Seoul',
  })
  updateDeliveries() {
    this.logger.log('updateDeliveries');
    console.log('updateDeliveries');
    console.log('updateDeliveries');
    console.log('updateDeliveries');
  }
}

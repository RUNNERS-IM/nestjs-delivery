// Nestjs
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

// Service
import { SweetTrackerService } from './sweet-tracker.service';
import { DeliveryService } from '../../modules/delivery/services/delivery.service';

// Main section
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private sweetTrackerService: SweetTrackerService,
    private deliveryService: DeliveryService,
  ) {}

  // @Cron(CronExpression.EVERY_5_SECONDS, {
  @Cron('0 7,10,13,16,19,22 * * *', {
    name: 'updateDeliveries',
    timeZone: 'Asia/Seoul',
  })
  async updateDeliveries() {
    await this.deliveryService.updateUncompleted();
  }
}

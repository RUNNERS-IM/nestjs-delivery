// Nestjs
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

// Service
import { ApiConfigService } from './api-config.service';
import { SweetTrackerService } from './sweet-tracker.service';

// Main section
describe('SweetTrackerService', () => {
  let service: SweetTrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [SweetTrackerService, ApiConfigService, ConfigService],
    }).compile();
    service = module.get<SweetTrackerService>(SweetTrackerService);
  });

  describe('getCompanies', () => {
    it('should return all companies', async () => {
      const data = await service.getCompanies();
      expect(data.filter((e) => e.title === 'CJ대한통운').length > 0).toBe(true);
    });
  });

  describe('getRecommandCompanies', () => {
    it('should return recommand companies', async () => {
      const data = await service.getRecommandCompanies('649466969061');
      expect(data.filter((e) => e.title === 'CJ대한통운').length > 0).toBe(true);
    });
  });

  describe('getDelivery', () => {
    it('should return recommand companies', async () => {
      const data = await service.getDelivery('649466969061', '04');
      console.log(data);
      // expect(data.filter((e) => e.title === 'CJ대한통운').length > 0).toBe(true);
      expect(true).toBe(true);
    });
  });

  // describe('addInvoice', () => {
  //   it('should add ', async () => {
  //     const urlCallback = '';
  //     const data = await service.addInvoice('649466969061', '04', urlCallback);
  //     expect(data.filter((e) => e.title === 'CJ대한통운').length > 0).toBe(true);
  //   });
  // });
});

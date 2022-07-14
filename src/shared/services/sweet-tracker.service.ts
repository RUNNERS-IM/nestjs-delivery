// Nestjs
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';

// Third party
import axios from 'axios';

// Service
import { ApiConfigService } from './api-config.service';

// Function section

const reformatCompany = (company) => {
  return {
    international: JSON.parse(String(company.International)),
    code: company.Code,
    title: company.Name,
  };
};

const reformatDelivery = (delivery) => {
  return {
    // Sender
    nameSender: delivery.senderName,

    // Office
    callOffice: delivery.lastStateDetail.telno,

    // Driver
    nameDriver: delivery.lastStateDetail.manName,
    callDriver: delivery.lastStateDetail.telno2,

    // Receiver
    nameReceiver: delivery.receiverName,
    addressReceiver: delivery.receiverAddr,

    // Basic
    title: delivery.itemName, // 상품명
    status: delivery.lastStateDetail.kind, // 상태
    estimate: delivery.estimate, // 배송 예정 시간: string
    time: delivery.lastStateDetail.timeString, // 배송 예정 시간: string
    isComplete: delivery.complete, // 배송 완료 여부: boolean
    level: delivery.level || delivery.lastStateDetail.level, // 진행단계: number (1: 배송준비중, 2: 집화완료, 3: 배송중, 4: 지점 도착, 5: 배송출발, 6:배송 완료)
    deliveryHistories: delivery.trackingDetails.map(reformatDeliveryDetail), // 배송내역
  };
};

const reformatDeliveryDetail = (deliveryDetail) => {
  return {
    // Basic
    category: deliveryDetail.kind,
    level: deliveryDetail.level,
    time: deliveryDetail.timeString,

    // Office
    callOffice: deliveryDetail.telno,

    // Driver
    nameDriver: deliveryDetail.manName,
    pictureDriver: deliveryDetail.manPic,
    callDriver: deliveryDetail.telno2,
    addressOffice: deliveryDetail.where,
  };
};

// Main section

@Injectable()
export class SweetTrackerService {
  // Variable section
  private sweettrackerTraceApi: string;
  private sweettrackerInfoApi: string;
  private sweettrackerKey: string;
  private sweettrackerTier: string;

  constructor(private apiConfigService: ApiConfigService) {
    const { sweettrackerInfoApi, sweettrackerTraceApi, sweettrackerKey, sweettrackerTier } =
      this.apiConfigService.sweettrackerConfig;
    this.sweettrackerInfoApi = sweettrackerInfoApi;
    this.sweettrackerTraceApi = sweettrackerTraceApi;
    this.sweettrackerKey = sweettrackerKey;
    this.sweettrackerTier = sweettrackerTier;
  }

  // Main section

  // Get function section

  getInfoUrl = (route: string) => {
    return String(new URL(`/api/v1/${route}`, this.sweettrackerInfoApi));
  };
  getInfoTemplateUrl = (mode: number) => {
    return String(new URL(`/tracking/${mode}?`, this.sweettrackerInfoApi));
  };
  getTraceUrl = (route: string) => {
    return String(new URL(`/${route}`, this.sweettrackerTraceApi));
  };

  getInfoParams = (params?: any) => {
    return { t_key: this.sweettrackerKey, ...params };
  };

  async getCompanies() {
    const url = this.getInfoUrl('companylist');
    const params = this.getInfoParams();
    const {
      data: { Company: response },
    } = await axios.get(url, { params });
    return response.map(reformatCompany);
  }

  async getRecommandCompanies(invoice: string) {
    const url = this.getInfoUrl('recommend');
    const params = this.getInfoParams({ t_invoice: invoice });
    const config: AxiosRequestConfig = { params };
    const {
      data: { Recommend: response },
    } = await axios.get(url, config);
    return response.map(reformatCompany);
  }

  async getDelivery(invoice: string, code: string) {
    const url = this.getInfoUrl('trackingInfo');
    const params = this.getInfoParams({ t_invoice: invoice, t_code: code });
    const { data: response } = await axios.get(url, { params });
    if (response.status == false) throw new ForbiddenException(response.msg);
    return reformatDelivery(response);
  }

  getDeliveryTemplate(invoice: string, code: string) {
    let url = new URL('https://info.sweettracker.co.kr/tracking/5');
    url.searchParams.set('t_key', this.sweettrackerKey);
    url.searchParams.set('t_invoice', invoice);
    url.searchParams.set('t_code', code);
    return String(url);
  }
}

// Nestjs
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';

// Third party
import axios from 'axios';

// Constants
// Service
// import { ApiConfigService } from './api-config.service';
import { ApiConfigService } from './api-config.service';

// Function section

const reformatCompany = (company) => {
  return {
    // international: JSON.parse(String(item.International)),
    code: company.Code,
    title: company.Name,
  };
};

const reformatDelivery = (delivery) => {
  return {
    nameSender: delivery.senderName,
    nameReceiver: delivery.receiverName,
    title: delivery.itemName, // 상품명
    estimate: delivery.estimate, // 배송 예정 시간: string
    isComplete: delivery.complete, // 배송 완료 여부: boolean
    level: delivery.level, // 진행단계: number (1: 배송준비중, 2: 집화완료, 3: 배송중, 4: 지점 도착, 5: 배송출발, 6:배송 완료)
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
  getTraceUrl = (route: string) => {
    return String(new URL(`/${route}`, this.sweettrackerTraceApi));
  };

  getInfoParams = (params?: any) => {
    return { t_key: this.sweettrackerKey, ...params };
  };

  getFid(key: string) {
    return 'Fid-' + String(key) + '-' + String(new Date().getTime());
  }

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
    return reformatDelivery(response);
  }

  // async addInvoice(invoice: string, code: string, urlCallback: string): any {
  //   const url = this.getInfoUrl('add_invoice');
  //   const data = this.getInfoParams({
  //     num: invoice, // 운송장번호(공백또는 "-"제거)
  //     code: code, // 배송사 코드
  //     fid: this.getFid('test'), // 해당 건의 결과 전송에 쓰이는 식별 값 ( 유니크한 값 )
  //     callback_url: 'https://localhost', // 결과를 전달받을 URL
  //     callback_type: 'json', // callback Response type (“map" , "json” , “xml”) : 기본 map
  //     tier: this.sweettrackerTier,
  //     key: this.sweettrackerKey,
  //   });
  //   const { data: response } = await axios.post(url, { data });
  //   const {
  //     senderName: sender,
  //     receiverName: receiver,
  //     itemName: title, // 상품명
  //     estimate: estimate, // 배송 예정 시간: string
  //     complete: isComplete, // 배송 완료 여부: boolean
  //     level: level, // 진행단계: number (1: 배송준비중, 2: 집화완료, 3: 배송중, 4: 지점 도착, 5: 배송출발, 6:배송 완료)
  //     trackingDetails: deliveryHistories, // 배송내역
  //   } = response;
  //
  //   return {
  //     sender,
  //     receiver,
  //     title,
  //     level,
  //     estimate,
  //     isComplete,
  //     deliveryHistories: deliveryHistories.map(reformatDeliveryDetail),
  //   };
  // }
}

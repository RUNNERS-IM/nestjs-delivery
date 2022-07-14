// Nestjs
import { CacheKey, CacheTTL, Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

// Constants
import { ApiTag } from '../../../constants/api-tag';
import { ApiPath } from '../../../constants/api-path';
import { RoleType } from '../../../constants';

// Decorators
import { Auth, AuthUser } from '../../../decorators';
import { ApiListResponse } from '../../../decorators/responses/api-list-response.decorator';

// Entity
import { CompanyEntity } from '../entities/company.entity';

// Services
import { CompanyService } from '../services/company.service';

// Response
import { CompanyListResponse, CompanyRetrieveResponse } from '../responses/company.response';
import { PaginateApiQuery } from '../../../decorators/queries/paginate-query.decorator';

// Dto

// Main section
@Controller(ApiPath.API + 'companies')
@ApiTags(ApiTag.COMPANY)
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  @PaginateApiQuery()
  @Auth([RoleType.USER, RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '배송사 리스트 조회 API',
    description: '배송사 리스트를 조회하는 API 입니다.',
  })
  @ApiListResponse(CompanyEntity, { description: '배송사 리스트 조회 성공시 결과 예시' })
  async getCompanies(@AuthUser() user) {
    // Get companies
    const companies: CompanyEntity[] = await this.companyService.find({});

    // Return Company
    return new CompanyListResponse(companies);
  }

  @CacheKey('getOneCompany')
  @CacheTTL(60 * 60 * 24) // 1 day
  @Get(':id')
  @Auth([RoleType.USER, RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '배송사 상세 조회 API',
    description: '배송사 상세 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '배송사 상세 조회 성공시 결과 예시',
    type: CompanyRetrieveResponse,
  })
  async getOneCompany(@AuthUser() user, @Param('id') id: Uuid) {
    // Get company
    const company: CompanyEntity = await this.companyService.findOneOrFail({ id: id });

    // Return company
    return new CompanyRetrieveResponse(company);
  }
}

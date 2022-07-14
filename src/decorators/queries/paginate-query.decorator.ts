// Nestjs
import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

// Main section
export function PaginateApiQuery() {
  return applyDecorators(
    ApiQuery({ name: 'page', required: false, example: 1 }),
    ApiQuery({ name: 'limit', required: false, example: 20 }),
    ApiQuery({ name: 'search', required: false }),
    ApiQuery({ name: 'sortBy', required: false, example: 'id:DESC' }),
  );
}

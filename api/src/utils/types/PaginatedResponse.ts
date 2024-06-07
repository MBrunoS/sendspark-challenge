import { IsNumber } from 'class-validator';

export class PaginatedResponse<T> {
  data: T[];

  @IsNumber()
  totalPages: number;

  @IsNumber()
  page: number;

  @IsNumber()
  per_page: number;
}

export interface QueryDto {
  page: number;
  make?: number | string;
  model?: number | string;
  engine?: number | string;
  color?: number;
  condition?: number;
  country?: number | string;
  city?: number | string;
  userId?: number;
  yearFrom?: number | string;
  yearTo?: number | string;
  mileageFrom?: number | string;
  mileageTo?: number | string;
  favorites?: boolean;
  commercial?: boolean;
  owned?: boolean;
}

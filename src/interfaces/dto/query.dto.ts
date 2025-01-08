export interface QueryDto {
  page: number;
  make?: number | string;
  model?: number | string;
  engine?: number;
  color?: number;
  condition?: number;
  country?: number;
  city?: number;
  userId?: number;
}

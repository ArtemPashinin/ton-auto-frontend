export interface AdvertisementDto {
  id?: string;
  user_id?: number;
  model_id?: string | number;
  year?: number | string;
  hp?: number | string;
  mileage?: number | string;
  engine_id?: string | number;
  color_id?: string | number;
  price?: number;
  description?: string;
  condition_id?: string | number;
  commercial: boolean;
  [key: string]: unknown;
}

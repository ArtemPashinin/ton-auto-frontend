export interface AdvertisementDto {
  id?: string;
  user_id?: number;
  model_id?: string | number;
  year?: number;
  hp?: number | string;
  mileage?: number | string;
  engine_id?: string | number;
  color_id?: string;
  price?: number;
  description?: string;
  condition_id?: string | number;
  [key: string]: any;
}

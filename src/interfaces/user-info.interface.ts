
export interface Country {
  id: number;
  title: string;
  currency: string;
  phone_code: string;
}

export interface City {
  id: number;
  title: string;
  country: Country;
}

export interface User {
  id?: number;
  user_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  language_code?: string;
  city: City;
  admin: boolean;
  free_publish: boolean;
}
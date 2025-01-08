import { City } from "./city.interface";
import { Country } from "./country.interface";

export interface User {
  id?: number;
  user_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  language_code?: string;
  city: City;
}

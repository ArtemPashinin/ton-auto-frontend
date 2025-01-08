import { Country } from "./country.interface";

export interface City {
  id: number;
  title: string;
  country: Country;
}

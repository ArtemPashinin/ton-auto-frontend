import { City, Country, User } from "./user-info.interface";
import {
  Model,
  EngineType,
  Color,
  Media,
  Condition,
} from "./vehicle-info.interface";

export interface Advertisement {
  id: string;
  user: User;
  model: Model;
  year: number;
  hp: number;
  mileage: number;
  engine: EngineType;
  color: Color;
  price: number;
  description: string;
  createdAt: string;
  media: Media[];
  favoritedBy: User[];
  commercial: boolean;
  condition: Condition;
  fict_phone?: string;
  paid: boolean;
  fict_country?: Country;
  fict_city?: City;
}

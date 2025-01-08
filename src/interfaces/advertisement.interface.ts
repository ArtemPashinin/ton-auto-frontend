import { Color } from "./color.interface";
import { EngineType } from "./engine-type.interface";
import { Make } from "./make.interface";
import { Media } from "./media.interface";
import { Model } from "./model.interface";
import { User } from "./user.interface";

export interface Advertisement {
  id: string;
  user: User;
  make: Make;
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
  favoritesBy?: User[];
}

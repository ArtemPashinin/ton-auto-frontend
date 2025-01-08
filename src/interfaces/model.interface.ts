import { Make } from "./make.interface";

export interface Model {
  id: number;
  make_id: number;
  model: string;
  make: Make;
}

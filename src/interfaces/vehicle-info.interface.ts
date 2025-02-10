export interface Color {
  id: number;
  color: string;
}

export interface Condition {
  id: string;
  title: string;
}

export interface EngineType {
  id: number;
  type: string;
}

export interface Make {
  id: number;
  make: string;
}

export interface Model {
  id: number;
  make_id: number;
  model: string;
  make: Make;
}

export interface Media {
  id: number;
  image_url: string;
  advertisement_id: string;
  order: number;
  main: boolean;
}

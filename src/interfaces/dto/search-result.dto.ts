import { Advertisement } from "../advertisement.interface";

export interface SearchResultDto {
  advertisements: Advertisement[];
  count: number;
}

import { City } from "../interfaces/vehicle-info.interface";
import { fetchDependentData } from "./fetch-dependent-data";

export const fetchCities = async (
  countryId?: number | string
): Promise<City[]> => {
  return await fetchDependentData<City>("user/cities", countryId);
};

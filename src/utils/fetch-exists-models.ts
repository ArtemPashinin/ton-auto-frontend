import { Model } from "../interfaces/vehicle-info.interface";
import { fetchDependentData } from "./fetch-dependent-data";

export const fetchExistsModels = async (
  makeId?: number | string
): Promise<Model[]> => {
  return await fetchDependentData<Model>("vehicle/existsModels", makeId);
};

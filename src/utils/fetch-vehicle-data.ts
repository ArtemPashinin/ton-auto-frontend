import axios from "axios";
import { Make } from "../interfaces/make.interface";
import { EngineType } from "../interfaces/engine-type.interface";
import { Color } from "../interfaces/color.interface";
import { Condition } from "../interfaces/condition.interface";
import { Model } from "../interfaces/model.interface";

interface EndPointMap {
  makes: Make[];
  model: Model[];
  engineTypes: EngineType[];
  colors: Color[];
  conditions: Condition[];
}

export type VehicleEndpoint = keyof EndPointMap;

export const fetchVehicleData = async <T extends VehicleEndpoint>(
  endpoint: T
): Promise<EndPointMap[T]> => {
  const url = `${import.meta.env.VITE_APP_API_URL}/vehicle/${endpoint}`;
  try {
    const response = await axios.get<EndPointMap[T]>(url);
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
};

import axios from "axios";
import {
  Color,
  Condition,
  EngineType,
  Make,
  Model,
} from "../interfaces/vehicle-info.interface";
import { City, Country } from "../interfaces/user-info.interface";

interface EndPointMap {
  makes: Make[];
  models: Model[];
  engineTypes: EngineType[];
  colors: Color[];
  conditions: Condition[];
  cities: City[];
  countries: Country[];
  existsMakes: Make[];
}

export type VehicleEndpoint = keyof EndPointMap;

const endpointPaths: Record<VehicleEndpoint, string> = {
  makes: "/vehicle",
  models: "/vehicle",
  engineTypes: "/vehicle",
  colors: "/vehicle",
  conditions: "/vehicle",
  cities: "/user",
  countries: "/user",
  existsMakes: "/vehicle",
};

export const fetchVehicleData = async <T extends VehicleEndpoint>(
  endpoint: T
): Promise<EndPointMap[T]> => {
  const basePath = endpointPaths[endpoint];
  const url = `${import.meta.env.VITE_APP_API_URL}${basePath}/${endpoint}`;

  const response = await axios.get<EndPointMap[T]>(url);
  return response.data;
};

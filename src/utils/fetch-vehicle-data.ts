import axios from "axios";
import {
  City,
  Color,
  Condition,
  Country,
  EngineType,
  Make,
  Model,
} from "../interfaces/vehicle-info.interface";

interface EndPointMap {
  makes: Make[];
  models: Model[];
  engineTypes: EngineType[];
  colors: Color[];
  conditions: Condition[];
  cities: City[];
  countries: Country[];
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
};

export const fetchVehicleData = async <T extends VehicleEndpoint>(
  endpoint: T
): Promise<EndPointMap[T]> => {
  const basePath = endpointPaths[endpoint];
  const url = `${import.meta.env.VITE_APP_API_URL}${basePath}/${endpoint}`;

  try {
    const response = await axios.get<EndPointMap[T]>(url);
    return response.data;
  } catch (err) {
    console.error(`Error fetching data from ${endpoint}:`, err);
    return [];
  }
};

import axios from "axios";
import { Make } from "../interfaces/vehicle-info.interface";

export const fetchMakeByModel = async (id: string | number): Promise<Make> => {
  const url = `${import.meta.env.VITE_APP_API_URL}/vehicle/makes/${id}`;
  const response = await axios.get<Make>(url);
  return response.data;
};

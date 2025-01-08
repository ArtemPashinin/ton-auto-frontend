import axios from "axios";
import { Advertisement } from "../interfaces/advertisement.interface";
import { QueryDto } from "../interfaces/dto/query.dto";

export const fetchAdvertisements = async (
  query: QueryDto
): Promise<Advertisement[]> => {
  const url = `${import.meta.env.VITE_APP_API_URL}/advertisements`;
  try {
    const response = await axios.get<Advertisement[]>(url, { params: query });
    return response.data;
  } catch (err) {
    console.log(err);
  }
  return [];
};

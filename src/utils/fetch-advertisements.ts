import axios from "axios";
import { QueryDto } from "../interfaces/dto/query.dto";
import { SearchResultDto } from "../interfaces/dto/search-result.dto";

export const fetchAdvertisements = async (
  query: QueryDto
): Promise<SearchResultDto> => {
  const url = `${import.meta.env.VITE_APP_API_URL}/advertisements`;

  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== "")
  );
  try {
    const response = await axios.get<SearchResultDto>(url, {
      params: filteredQuery,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
  return {} as SearchResultDto;
};

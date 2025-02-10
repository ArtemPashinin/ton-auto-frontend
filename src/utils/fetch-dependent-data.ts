import axios from "axios";

export const fetchDependentData = async <T>(
  endpoint: string,
  id?: number | string
): Promise<T[]> => {
  const url = `${import.meta.env.VITE_APP_API_URL}/${endpoint}/${id}`;
  if (!id) {
    return [];
  }
  try {
    const response = await axios.get<T[]>(url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch models:", error);
  }
  return [];
};

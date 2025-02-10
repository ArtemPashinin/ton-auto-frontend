import axios from "axios";
import { Advertisement } from "../interfaces/advertisement.interface";

// TODO add error catch

/**
 * Функция для загрузки объявления по ID
 * @param advertisementId - ID объявления
 * @returns Advertisement | null
 */
export const fetchAdvertisement = async (
  advertisementId: string
): Promise<Advertisement | null> => {
  const url = `${import.meta.env.VITE_APP_API_URL}/advertisements/${advertisementId}`;
  
  try {
    const { data } = await axios.get<Advertisement | string>(url);
    
    if (!data || typeof data === "string") {
      return null;
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Ошибка при загрузке объявления:", error.response?.data || error.message);
    } else {
      console.error("Неизвестная ошибка:", error);
    }
    return null;
  }
};

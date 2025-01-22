import axios from "axios";
import { AdvertisementDto } from "../interfaces/dto/advertisement.dto";

export const updateAdvertisement = async (
  dto: AdvertisementDto,
  id: string
): Promise<void> => {
  try {
    console.log(dto);
    const url = `${import.meta.env.VITE_APP_API_URL}/advertisements/${id}`;
    await axios.put(url, dto);
  } catch (error) {
    console.error(error);
  }
};

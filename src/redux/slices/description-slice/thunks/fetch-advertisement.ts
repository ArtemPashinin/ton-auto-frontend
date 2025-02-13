import axios from "axios";
import { Advertisement } from "../../../../interfaces/advertisement.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SlicesNames } from "../../../../enums/slices";

// TODO add error catch

/**
 * Функция для загрузки объявления по ID
 * @param advertisementId - ID объявления
 * @returns Advertisement | null
 */
export const fetchDescription = createAsyncThunk(
  `${SlicesNames.DESCRIPTION}/fetchDescription`,
  async (advertisementId: string): Promise<Advertisement> => {
    const url = `${
      import.meta.env.VITE_APP_API_URL
    }/advertisements/${advertisementId}`;

    const { data } = await axios.get<Advertisement>(url);
    return data;
  }
);

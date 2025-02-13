import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SlicesNames } from "../../../../enums/slices";

export const removeAdretisement = createAsyncThunk(
  `${SlicesNames.MY_ADS}/removeAdvertisement`,
  async (id: string): Promise<string> => {
    const url = `${import.meta.env.VITE_APP_API_URL}/advertisements/${id}`;
    await axios.delete(url);
    return id
  }
);

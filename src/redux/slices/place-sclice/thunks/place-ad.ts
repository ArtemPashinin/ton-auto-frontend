import { createAsyncThunk } from "@reduxjs/toolkit";
import { SlicesNames } from "../../../../enums/slices";
import axios from "axios";
import { Advertisement } from "../../../../interfaces/advertisement.interface";

export const placeAd = createAsyncThunk<
  Advertisement,
  FormData,
  { rejectValue: string }
>(
  `${SlicesNames.PLACE}/placeAd`,
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/advertisements`,
        formData
      );
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to publish");
    }
  }
);

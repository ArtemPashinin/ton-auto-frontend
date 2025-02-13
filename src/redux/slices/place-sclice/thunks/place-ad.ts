import { createAsyncThunk } from "@reduxjs/toolkit";
import { SlicesNames } from "../../../../enums/slices";
import axios from "axios";

export const placeAd = createAsyncThunk(
  `${SlicesNames.PLACE}/placeAd`,
  async (formData: FormData) => {
    await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/advertisements`,
      formData
    );
  }
);

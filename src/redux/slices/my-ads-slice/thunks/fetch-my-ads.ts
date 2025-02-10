import { createAsyncThunk } from "@reduxjs/toolkit";
import { SlicesNames } from "../../../../enums/slices";
import { SearchResultDto } from "../../../../interfaces/dto/search-result.dto";
import axios from "axios";
import { RootState } from "../../../store";
import { QueryDto } from "../../../../interfaces/dto/query.dto";

export const fetchMyAds = createAsyncThunk(
  `${SlicesNames.MY_ADS}/fetchMyAds`,
  async (userId: number, { getState }): Promise<SearchResultDto> => {
    const state = getState() as RootState;
    const page = state.page.favoritesPage;
    const url = `${import.meta.env.VITE_APP_API_URL}/advertisements`;

    const { data } = await axios.get<SearchResultDto>(url, {
      params: { page, userId: userId, owned: true } as QueryDto,
    });
    return data;
  }
);

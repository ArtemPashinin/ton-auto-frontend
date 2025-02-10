import { createAsyncThunk } from "@reduxjs/toolkit";
import { SlicesNames } from "../../../../enums/slices";
import { QueryDto } from "../../../../interfaces/dto/query.dto";
import { SearchResultDto } from "../../../../interfaces/dto/search-result.dto";
import axios from "axios";
import { RootState } from "../../../store";
import throttle from "lodash.throttle";

export const fetchAdvertisements = createAsyncThunk(
  `${SlicesNames.ADVERTISEMENT}/fetchAdvertisements`,
  async (query: QueryDto, { getState }): Promise<SearchResultDto> => {
    const state = getState() as RootState;
    const page = state.page.searchPage;
    const url = `${import.meta.env.VITE_APP_API_URL}/advertisements`;
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(([, value]) => value !== "")
    );

    const throttledFetch = throttle(async () => {
      const { data } = await axios.get<SearchResultDto>(url, {
        params: { ...filteredQuery, page },
      });
      return data;
    }, 1000);

    return throttledFetch();
  }
);

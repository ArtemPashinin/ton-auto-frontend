import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SlicesNames } from "../../../enums/slices";
import { Advertisement } from "../../../interfaces/advertisement.interface";
import { fetchMyAds } from "./thunks/fetch-my-ads";
import { SearchResultDto } from "../../../interfaces/dto/search-result.dto";
import { RootState } from "../../store";

interface MyAdsState {
  advertisements: Advertisement[];
  count: number;
  loading: boolean;
}

const initialState: MyAdsState = {
  advertisements: [],
  count: 0,
  loading: true,
};

const myAdsSlice = createSlice({
  name: SlicesNames.MY_ADS,
  initialState,
  reducers: {
    clearFavorites() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchMyAds.fulfilled,
      (state, action: PayloadAction<SearchResultDto>) => {
        state.advertisements = [
          ...state.advertisements,
          ...action.payload.advertisements,
        ];
        state.count = action.payload.count;
        state.loading = false;
      }
    );
    builder.addCase(fetchMyAds.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { clearFavorites } = myAdsSlice.actions;

export const myAdsLoadingSelector = (state: RootState) =>
  state.favorites.loading;
export const myAdsCountSelector = (state: RootState) => state.favorites.count;
export const myAdsSelector = (state: RootState) =>
  state.favorites.advertisements;

export default myAdsSlice.reducer;

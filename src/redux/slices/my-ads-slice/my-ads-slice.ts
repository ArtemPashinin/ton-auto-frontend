import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMyAds } from "./thunks/fetch-my-ads";
import { removeAdretisement } from "./thunks/remove-advertisement";
import { SlicesNames } from "../../../enums/slices";
import { Advertisement } from "../../../interfaces/advertisement.interface";
import { SearchResultDto } from "../../../interfaces/dto/search-result.dto";
import {
  FavoriteDto,
  markFavorite,
} from "../favorites-slice/thunks/mark-favorite";

import { RootState } from "../../store";

interface CustomPayloadAction extends PayloadAction<FavoriteDto | null> {
  meta: {
    arg: FavoriteDto;
  };
}

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
    clearMyAds() {
      return initialState;
    },
    setPaid(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.advertisements = state.advertisements.map((ad) => {
        if (ad.id === id) return { ...ad, paid: true };
        return { ...ad };
      });
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
    builder.addCase(
      removeAdretisement.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.advertisements = state.advertisements.filter(
          (advertsement) => advertsement.id !== action.payload
        );
        state.count = state.count - 1;
      }
    );
    builder.addCase(fetchMyAds.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      markFavorite.fulfilled,
      (state, action: CustomPayloadAction) => {
        const { advertisementId, user } = action.meta.arg;
        state.advertisements = state.advertisements.map((ad) =>
          ad.id === advertisementId
            ? {
                ...ad,
                favoritedBy:
                  ad.favoritedBy && ad.favoritedBy.length > 0 ? [] : [user],
              }
            : ad
        );
      }
    );
  },
});

export const { clearMyAds, setPaid } = myAdsSlice.actions;

export const myAdsLoadingSelector = (state: RootState) => state.myAds.loading;
export const myAdsCountSelector = (state: RootState) => state.myAds.count;
export const myAdsSelector = (state: RootState) => state.myAds.advertisements;

export default myAdsSlice.reducer;

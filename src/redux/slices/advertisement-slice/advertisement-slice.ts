import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Advertisement } from "../../../interfaces/advertisement.interface";
import { SlicesNames } from "../../../enums/slices";
import { fetchAdvertisements } from "./thunks/fetch-advertisement";
import { SearchResultDto } from "../../../interfaces/dto/search-result.dto";
import { RootState } from "../../store";
import {
  FavoriteDto,
  markFavorite,
} from "../favorites-slice/thunks/mark-favorite";

interface CustomPayloadAction extends PayloadAction<FavoriteDto | null> {
  meta: {
    arg: FavoriteDto;
  };
}

interface AdvertisementState {
  advertisements: Advertisement[];
  count: number;
  loading: boolean;
}

const initialState: AdvertisementState = {
  advertisements: [],
  count: 0,
  loading: true,
};

const advertisementSlice = createSlice({
  name: SlicesNames.ADVERTISEMENT,
  initialState,
  reducers: {
    clearAdvertisements(state) {
      state.advertisements = [];
      state.count = 0;
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAdvertisements.fulfilled,
      (state, action: PayloadAction<SearchResultDto>) => {
        state.advertisements = [
          ...state.advertisements,
          ...action.payload.advertisements,
        ];
        state.count = action.payload.count;
        state.loading = false;
      }
    );
    builder.addCase(fetchAdvertisements.pending, (state) => {
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

export const { clearAdvertisements } = advertisementSlice.actions;

export const advertisementLoadingSelector = (state: RootState) =>
  state.advertisement.loading;
export const advertisementCountSelector = (state: RootState) =>
  state.advertisement.count;
export const advertisementsSelector = (state: RootState) =>
  state.advertisement.advertisements;

export default advertisementSlice.reducer;

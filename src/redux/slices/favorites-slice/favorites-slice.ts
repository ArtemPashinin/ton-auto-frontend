import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Advertisement } from "../../../interfaces/advertisement.interface";
import { SlicesNames } from "../../../enums/slices";
import { SearchResultDto } from "../../../interfaces/dto/search-result.dto";
import { RootState } from "../../store";
import { fetchFavorites } from "./thunks/fetch-favorites";
import { FavoriteDto, markFavorite } from "./thunks/mark-favorite";

interface CustomPayloadAction extends PayloadAction<FavoriteDto | null> {
  meta: {
    arg: FavoriteDto; 
  };
}

interface FavoritesState {
  advertisements: Advertisement[];
  count: number;
  loading: boolean;
}

const initialState: FavoritesState = {
  advertisements: [],
  count: 0,
  loading: true,
};

const favoritesSlice = createSlice({
  name: SlicesNames.FAVORITES,
  initialState,
  reducers: {
    clearFavorites() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchFavorites.fulfilled,
      (state, action: PayloadAction<SearchResultDto>) => {
        state.advertisements = [
          ...state.advertisements,
          ...action.payload.advertisements,
        ];
        state.count = action.payload.count;
        state.loading = false;
      }
    );
    builder.addCase(fetchFavorites.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      markFavorite.fulfilled,
      (state, action: CustomPayloadAction) => {
        if (!action.payload) {
          const { advertisementId } = action.meta.arg;
          state.advertisements = state.advertisements.filter(
            (advertisement) => advertisement.id !== advertisementId
          );
          state.count = state.count - 1;
        }
      }
    );
  },
});

export const { clearFavorites } = favoritesSlice.actions;

export const favoritesLoadingSelector = (state: RootState) =>
  state.favorites.loading;
export const favoritesCountSelector = (state: RootState) =>
  state.favorites.count;
export const favoritesSelector = (state: RootState) =>
  state.favorites.advertisements;

export default favoritesSlice.reducer;

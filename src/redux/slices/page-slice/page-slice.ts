import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SlicesNames } from "../../../enums/slices";
import { RootState } from "../../store";

interface PageState {
  searchPage: number;
  favoritesPage: number;
  myAdsPage: number;
}

const initialState: PageState = {
  searchPage: 1,
  favoritesPage: 1,
  myAdsPage: 1,
};

const pageSlice = createSlice({
  name: SlicesNames.PAGE,
  initialState,
  reducers: {
    setNextPage(state, action: PayloadAction<{ pageType: keyof PageState }>) {
      const { pageType } = action.payload;
      state[pageType] += 1;
    },
    setPage(
      state,
      action: PayloadAction<{ pageType: keyof PageState; page: number }>
    ) {
      const { pageType, page } = action.payload;
      state[pageType] = Math.max(1, page);
    },
    clearPage(state, action: PayloadAction<{ pageType: keyof PageState }>) {
      const { pageType } = action.payload;
      state[pageType] = initialState[pageType];
    },
  },
});

export const { setNextPage, setPage, clearPage } = pageSlice.actions;

export const searchPageSelector = (state: RootState) => state.page.searchPage;
export const favoritesPageSelector = (state: RootState) =>
  state.page.favoritesPage;
export const myAdsPageSelector = (state: RootState) => state.page.myAdsPage;

export default pageSlice.reducer;

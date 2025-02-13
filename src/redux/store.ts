import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice/user-slice";
import errorReducer from "./slices/error-slice/error-slice";
import dataSlice from "./slices/data-slice/data-slice";
import advertisementSlice from "./slices/advertisement-slice/advertisement-slice";
import searchFiltersSlice from "./slices/search-filters-slice/search-filters-slice";
import pageSlice from "./slices/page-slice/page-slice";
import favoritesSlice from "./slices/favorites-slice/favorites-slice";
import myAdsSlice from "./slices/my-ads-slice/my-ads-slice";
import placeSlice from "./slices/place-sclice/place-slice";
import descriptionSlice from "./slices/description-slice/description-slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
    data: dataSlice,
    advertisement: advertisementSlice,
    filters: searchFiltersSlice,
    page: pageSlice,
    favorites: favoritesSlice,
    myAds: myAdsSlice,
    place: placeSlice,
    description: descriptionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

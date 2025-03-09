import { Image } from "../../../components/PlaceImage/PlaceImage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { placeAd } from "./thunks/place-ad";
import { SlicesNames } from "../../../enums/slices";
import { AdvertisementDto } from "../../../interfaces/dto/advertisement.dto";

import { RootState } from "../../store";

interface InitialState {
  placeData: AdvertisementDto;
  loading: boolean;
  error: boolean;
  images: {
    leftImages: Image[];
    rightImages: Image[];
    mainImageId: string | null;
  };
}

const initialState: InitialState = {
  placeData: {
    user_id: 0,
    model_id: undefined,
    year: undefined,
    hp: undefined,
    mileage: undefined,
    engine_id: undefined,
    color_id: undefined,
    price: undefined,
    description: undefined,
    condition_id: undefined,
    commercial: false,
    fict_city_id: undefined,
    fict_country_id: undefined,
  },
  images: {
    leftImages: [],
    rightImages: [],
    mainImageId: null,
  },
  loading: false,
  error: false,
};

const placeSlice = createSlice({
  name: SlicesNames.PLACE,
  initialState,
  reducers: {
    setField(
      state,
      action: PayloadAction<{
        key: keyof AdvertisementDto;
        value: AdvertisementDto[keyof AdvertisementDto];
      }>
    ) {
      const { key, value } = action.payload;
      state.placeData[key] = value;
    },
    addImage(
      state,
      action: PayloadAction<{ side: "left" | "right"; image: Image }>
    ) {
      const { side, image } = action.payload;
      state.images[side === "left" ? "leftImages" : "rightImages"].push(image);
    },
    setImages(
      state,
      action: PayloadAction<{ side: "left" | "right"; images: Image[] }>
    ) {
      const { side, images } = action.payload;
      state.images[side === "left" ? "leftImages" : "rightImages"] = images;
    },
    setMainImage(state, action: PayloadAction<string | null>) {
      state.images.mainImageId = action.payload;
    },
    clearPlace() {
      return initialState;
    },
    clearPlaceError(state) {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(placeAd.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(placeAd.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(placeAd.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const {
  setField,
  clearPlace,
  clearPlaceError,
  addImage,
  setMainImage,
  setImages,
} = placeSlice.actions;

export const placeSelector = (state: RootState) => state.place.placeData;
export const placeImagesSelector = (state: RootState) => state.place.images;
export const publishLoadingSelector = (state: RootState) => state.place.loading;
export const publishError = (state: RootState) => state.place.error;

export default placeSlice.reducer;

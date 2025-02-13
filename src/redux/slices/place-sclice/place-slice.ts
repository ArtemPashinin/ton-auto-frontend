import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdvertisementDto } from "../../../interfaces/dto/advertisement.dto";
import { SlicesNames } from "../../../enums/slices";
import { RootState } from "../../store";
import { placeAd } from "./thunks/place-ad";

interface InitialState {
  placeData: AdvertisementDto;
  loading: boolean;
  error: boolean
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
  },
  loading: false,
  error: false
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
    clearPlace() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(placeAd.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(placeAd.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export const { setField, clearPlace } = placeSlice.actions;

export const placeSelector = (state: RootState) => state.place.placeData;
export const publishLoadingSelector = (state: RootState) => state.place.loading;
export const publishError = (state: RootState) => state.place.error

export default placeSlice.reducer;

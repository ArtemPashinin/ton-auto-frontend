import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDescription } from "./thunks/fetch-advertisement";
import { SlicesNames } from "../../../enums/slices";
import { Advertisement } from "../../../interfaces/advertisement.interface";
import { AdvertisementDto } from "../../../interfaces/dto/advertisement.dto";

import { RootState } from "../../store";

interface InitialState {
  description: AdvertisementDto;
  advertisiment: Advertisement;
  loading: boolean;
  error: boolean;
}

const initialState: InitialState = {
  description: {
    id: undefined,
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
    fict_phone: undefined,
    fict_city_id: undefined,
    fict_country_id: undefined,
  },
  loading: false,
  error: false,
  advertisiment: {
    id: "",
    user: {
      user_id: 0,
      city: {
        id: 0,
        title: "",
        country: {
          id: 0,
          title: "",
          currency: "",
          phone_code: "",
        },
      },
      admin: false,
      free_publish: false,
    },
    model: {
      id: 0,
      make_id: 0,
      model: "",
      make: {
        id: 0,
        make: "",
      },
    },
    year: 0,
    hp: 0,
    mileage: 0,
    engine: {
      id: 0,
      type: "",
    },
    color: {
      id: 0,
      color: "",
    },
    price: 0,
    description: "",
    createdAt: "",
    media: [],
    favoritedBy: [],
    commercial: false,
    condition: {
      id: "",
      title: "",
    },
    fict_phone: "",
    paid: false,
    fict_city: {
      id: 0,
      title: "",
      country: {
        id: 0,
        title: "",
        currency: "",
        phone_code: "",
      },
    },
    fict_country: {
      id: 0,
      title: "",
      currency: "",
      phone_code: "",
    },
  },
};

const descriptionSlice = createSlice({
  name: SlicesNames.DESCRIPTION,
  initialState,
  reducers: {
    setNewDecriptionField(
      state,
      action: PayloadAction<{
        key: keyof AdvertisementDto;
        value: AdvertisementDto[keyof AdvertisementDto];
      }>
    ) {
      const { key, value } = action.payload;
      state.description[key] = value;
    },
    clearEditDesc() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchDescription.fulfilled,
      (state, action: PayloadAction<Advertisement>) => {
        const advertisement = action.payload;
        state.description = {
          model_id: advertisement.model.id,
          engine_id: advertisement.engine.id,
          color_id: advertisement.color.id,
          hp: advertisement.hp,
          year: advertisement.year,
          price: advertisement.price,
          user_id: advertisement.user.id,
          condition_id: advertisement.condition.id,
          mileage: advertisement.mileage,
          description: advertisement.description,
          commercial: advertisement.commercial,
          fict_phone: advertisement.fict_phone,
          fict_city_id: advertisement.fict_city.id,
          fict_country_id: advertisement.fict_country.id,
        };
        state.advertisiment = advertisement;
      }
    );
  },
});

export const { setNewDecriptionField, clearEditDesc } =
  descriptionSlice.actions;

export const descriptionSelector = (state: RootState) =>
  state.description.description;
export const editenAdvertisementSelector = (state: RootState) =>
  state.description.advertisiment;

export default descriptionSlice.reducer;

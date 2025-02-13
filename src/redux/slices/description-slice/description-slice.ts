import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdvertisementDto } from "../../../interfaces/dto/advertisement.dto";
import { SlicesNames } from "../../../enums/slices";
import { fetchDescription } from "./thunks/fetch-advertisement";
import { Advertisement } from "../../../interfaces/advertisement.interface";
import { RootState } from "../../store";

interface InitialState {
  description: AdvertisementDto;
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
  },
  loading: false,
  error: false,
};

const descriptionSlice = createSlice({
  name: SlicesNames.DESCRIPTION,
  initialState,
  reducers: {},
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
        };
      }
    );
  },
});

export const descriptionSelector = (state:RootState) => state.description.description

export default descriptionSlice.reducer;

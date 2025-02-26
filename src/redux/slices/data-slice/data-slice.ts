import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchColors } from "./thunks/fetch-colors";
import { fetchConditions } from "./thunks/fetch-conditions";
import { fetchCountries } from "./thunks/fetch-countries";
import { fetchEngineTypes } from "./thunks/fetch-engine-types";
import { fetchExistsMakes } from "./thunks/fetch-exists-makes";
import { fetchMakes } from "./thunks/fetch-makes";
import { SlicesNames } from "../../../enums/slices";
import { Country } from "../../../interfaces/user-info.interface";
import {
  Color,
  Condition,
  EngineType,
  Make,
} from "../../../interfaces/vehicle-info.interface";

import { RootState } from "../../store";

export interface DataState {
  countries: Country[];
  makes: Make[];
  engineTypes: EngineType[];
  colors: Color[];
  conditions: Condition[];
  existsMakes: Make[];
}

const initialState: DataState = {
  countries: [],
  makes: [],
  engineTypes: [],
  colors: [],
  conditions: [],
  existsMakes: [],
};

const dataSlice = createSlice({
  name: SlicesNames.DATA,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCountries.fulfilled,
      (state, action: PayloadAction<Country[]>) => {
        state.countries = action.payload;
      }
    );
    builder.addCase(
      fetchMakes.fulfilled,
      (state, action: PayloadAction<Make[]>) => {
        state.makes = action.payload;
      }
    );
    builder.addCase(
      fetchEngineTypes.fulfilled,
      (state, action: PayloadAction<EngineType[]>) => {
        state.engineTypes = action.payload;
      }
    );
    builder.addCase(
      fetchColors.fulfilled,
      (state, action: PayloadAction<Color[]>) => {
        state.colors = action.payload;
      }
    );
    builder.addCase(
      fetchConditions.fulfilled,
      (state, action: PayloadAction<Condition[]>) => {
        state.conditions = action.payload;
      }
    );
    builder.addCase(fetchExistsMakes.fulfilled, (state, action: PayloadAction<Make[]>) =>{
      state.existsMakes = action.payload
    })
  },
});

export const countriesSelector = (state: RootState) => state.data.countries;
export const makeSelector = (state: RootState) => state.data.makes;
export const engineTypesSelector = (state: RootState) => state.data.engineTypes;
export const colorsSelector = (state: RootState) => state.data.colors;
export const conditionsSelector = (state: RootState) => state.data.conditions;
export const existsMakesSelector = (state: RootState) => state.data.existsMakes
export const getAllData = (state: RootState) => state.data

export default dataSlice.reducer;

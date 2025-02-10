import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Country } from "../../../interfaces/user-info.interface";
import { EngineType, Make } from "../../../interfaces/vehicle-info.interface";
import { SlicesNames } from "../../../enums/slices";
import { fetchCountries } from "./thunks/fetch-countries";
import { RootState } from "../../store";
import { fetchMakes } from "./thunks/fetch-makes";
import { fetchEngineTypes } from "./thunks/fetch-engine-types";

interface DataState {
  countries: Country[];
  makes: Make[];
  engineTypes: EngineType[];
}

const initialState: DataState = {
  countries: [],
  makes: [],
  engineTypes: [],
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
  },
});

export const countriesSelector = (state: RootState) => state.data.countries;
export const makeSelector = (state: RootState) => state.data.makes;
export const engineTypesSelector = (state: RootState) => state.data.engineTypes;

export default dataSlice.reducer;

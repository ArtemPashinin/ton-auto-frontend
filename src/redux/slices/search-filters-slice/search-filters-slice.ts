import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueryDto } from "../../../interfaces/dto/query.dto";
import { SlicesNames } from "../../../enums/slices";
import { RootState } from "../../store";
import { fetchUser } from "../user-slice/thunks/fetch-user";
import { User } from "../../../interfaces/user-info.interface";
import { updateUser } from "../user-slice/thunks/update-user";

const initialState: QueryDto = {
  make: undefined,
  model: undefined,
  engine: undefined,
  color: undefined,
  condition: undefined,
  country: undefined,
  city: undefined,
  userId: undefined,
  yearFrom: undefined,
  yearTo: undefined,
  mileageFrom: undefined,
  mileageTo: undefined,
  favorites: undefined,
  commercial: false,
  owned: undefined,
  type: undefined,
};

const querySlice = createSlice({
  name: SlicesNames.FILTERS,
  initialState,
  reducers: {
    setFilter(
      state,
      action: PayloadAction<{
        key: keyof QueryDto;
        value: QueryDto[keyof QueryDto];
      }>
    ) {
      const { key, value } = action.payload;
      (state as Record<keyof QueryDto, QueryDto[keyof QueryDto]>)[key] = value;
    },
    resetFilters(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User | null>) => {
        if (action.payload && action.payload?.city?.country?.id) {
          state.country = action.payload.city.country.id;
        }
      }
    );
    builder.addCase(
      updateUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.country = action.payload.city.country.id;
      }
    );
  },
});

export const { setFilter, resetFilters } = querySlice.actions;

export const searchFiltersSelector = (state: RootState) => state.filters;

export default querySlice.reducer;

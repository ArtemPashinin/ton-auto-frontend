import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SlicesNames } from "../../../enums/slices";
import { RootState } from "../../store";

interface ErrorState {
  errorMessage: string;
  iSerror: boolean;
}

const initialState: ErrorState = {
  errorMessage: "",
  iSerror: false,
};

const errorSlice = createSlice({
  name: SlicesNames.ERROR,
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      state.iSerror = true;
    },
    clearError: () => {
      return initialState;
    },
  },
});

export const errorSelecton = (state: RootState) => state.error;

export default errorSlice.reducer;

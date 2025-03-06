import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUser } from "./thunks/create-user";
import { fetchUser } from "./thunks/fetch-user";
import { updateUser } from "./thunks/update-user";
import { SlicesNames } from "../../../enums/slices";
import { User } from "../../../interfaces/user-info.interface";
import { placeAd } from "../place-sclice/thunks/place-ad";

import { RootState } from "../../store";

interface UserState {
  user: User | null;
  loading: boolean;
  isRegistred: boolean | null;
}

const initialState: UserState = {
  user: null,
  loading: true,
  isRegistred: null,
};

const userSlice = createSlice({
  name: SlicesNames.USER,
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User | null>) => {
        state.user = action.payload;
        state.isRegistred = action.payload !== null;
        state.loading = false;
      }
    );
    builder.addCase(
      updateUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(
      createUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(placeAd.fulfilled, (state) => {
      if (state.user) state.user.free_publish = false;
    });
  },
});

export const userSelector = (state: RootState) => state.user.user;
export const userLoadingSelector = (state: RootState) => state.user.loading;

export default userSlice.reducer;
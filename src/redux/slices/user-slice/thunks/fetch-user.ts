import { createAsyncThunk } from "@reduxjs/toolkit";
import { SlicesNames } from "../../../../enums/slices";
import WebApp from "@twa-dev/sdk";
import axios from "axios";
import { User } from "../../../../interfaces/user-info.interface";

// TODO add error statement

export const fetchUser = createAsyncThunk(
  `${SlicesNames.USER}/fetchUser`,
  async (): Promise<User | null> => {
    const url = `${import.meta.env.VITE_APP_API_URL}/user`;
    const webAppUser = WebApp.initDataUnsafe.user as User;
    const { data } = await axios.get<User | string>(url, {
      params: { tgId: webAppUser.id },
    });
    if (data === "") return null;

    return data as User;
  }
);

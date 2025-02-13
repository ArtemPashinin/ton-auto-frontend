import axios from "axios";
import WebApp from "@twa-dev/sdk";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SlicesNames } from "../../../../enums/slices";
import { UserDto } from "../../../../interfaces/dto/user.dto";
import { User } from "../../../../interfaces/user-info.interface";

// TODO add error statement

export const updateUser = createAsyncThunk(
  `${SlicesNames.USER}/updateUser`,
  async (body: Partial<UserDto>): Promise<User> => {
    const url = `${import.meta.env.VITE_APP_API_URL}/user`;
    const webAppUser = WebApp.initDataUnsafe.user as User;
    const { data } = await axios.put<User>(url, body, {
      params: { tgId: webAppUser.id },
    });
    return data;
  }
);

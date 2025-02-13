import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SlicesNames } from "../../../../enums/slices";
import { UserDto } from "../../../../interfaces/dto/user.dto";
import { User } from "../../../../interfaces/user-info.interface";

// TODO add error statement

export const createUser = createAsyncThunk(
  `${SlicesNames.USER}/createUser`,
  async (body: UserDto): Promise<User> => {
    const url = `${import.meta.env.VITE_APP_API_URL}/user`;
    console.log(body);
    const { data } = await axios.post<User>(url, body);
    return data;
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SlicesNames } from "../../../../enums/slices";
import { User } from "../../../../interfaces/user-info.interface";

export interface FavoriteDto {
  user: User;
  advertisementId: string;
}

export const markFavorite = createAsyncThunk(
  `${SlicesNames.FAVORITES}/markFavorite`,
  async ({
    user,
    advertisementId,
  }: FavoriteDto): Promise<FavoriteDto | null> => {
    const url = `${import.meta.env.VITE_APP_API_URL}/user/favorite`;

    const { data } = await axios.post<FavoriteDto | string>(url, {
      userId: { id: user.id },
      advertisementId: advertisementId,
    });
    if (data === "") return null;
    return data as FavoriteDto;
  }
);

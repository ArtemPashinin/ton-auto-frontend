import WebApp from "@twa-dev/sdk";
import axios from "axios";
import { User } from "../interfaces/vehicle-info.interface";

export const fetchUser = async (): Promise<User> => {
  try {
    const webAppUser = WebApp.initDataUnsafe.user as User;
    const response = await axios.get<User>(
      `${import.meta.env.VITE_APP_API_URL}/user`,
      {
        params: { tgId: webAppUser.id },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Failed to set up user:", err);
    return {} as User;
  }
};

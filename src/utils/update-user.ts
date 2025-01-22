import axios from "axios";
import { User } from "../interfaces/vehicle-info.interface";
import { UserDto } from "../interfaces/dto/user.dto";
import WebApp from "@twa-dev/sdk";

export const updateUser = async (
  body: Partial<UserDto>,
  userId: number | string
) => {
  const url = `${import.meta.env.VITE_APP_API_URL}/user`;
  try {
    const response = await axios.put<User>(url, body, {
      params: { id: userId },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    WebApp.showAlert("Error when updating data, please try again later");
  }
};

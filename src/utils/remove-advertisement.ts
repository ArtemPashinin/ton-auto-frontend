import axios from "axios";

export const removeAdretisement = async (id: string): Promise<void> => {
  const url = `${import.meta.env.VITE_APP_API_URL}/advertisements/${id}`;
  try {
    await axios.delete(url);
  } catch (err) {
    console.error(err);
  }
};

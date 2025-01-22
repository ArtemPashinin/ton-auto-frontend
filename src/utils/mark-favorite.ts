import axios from "axios";

export const markFavorite = async (
  userId: number | undefined,
  advertisementId: string
) => {
  const url = `${import.meta.env.VITE_APP_API_URL}/user/favorite`;
  try {
    if (userId) {
      const response = await axios.post(url, {
        userId: { id: userId },
        advertisementId: advertisementId,
      });
      return response.data;
    }
  } catch (err) {
    console.error(err);
  }
};

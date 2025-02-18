import axios from "axios";

export const makePaymentLink = async (
  advertisementId: string
): Promise<string> => {
  const url = `${import.meta.env.VITE_APP_API_URL}/bot/payload`;
  const { data } = await axios.post<string>(url, {
    advertisement_id: advertisementId,
  });
  return data;
};

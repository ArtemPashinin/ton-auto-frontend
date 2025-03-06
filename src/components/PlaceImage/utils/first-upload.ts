import WebApp from "@twa-dev/sdk";
import { AdvertisementDto } from "../../../interfaces/dto/advertisement.dto";
import {
  clearPlace,
  clearPlaceError,
} from "../../../redux/slices/place-sclice/place-slice";
import { placeAd } from "../../../redux/slices/place-sclice/thunks/place-ad";
import { AppDispatch } from "../../../redux/store";
import { Image } from "../PlaceImage";

import { makePaymentLink } from "../../../utils/make-payment-link";

export const handleFirstUpload = async (
  leftImages: Image[],
  rightImages: Image[],
  mainImageId: string | null,
  placeData: AdvertisementDto,
  dispatch: AppDispatch,
  navigate: (path: string, options?: { replace?: boolean }) => void,
  later: boolean,
  withPaid: boolean
) => {
  if (leftImages.length + rightImages.length < 1) {
    WebApp.showAlert("No images");
    return;
  }
  const mediaList = [...leftImages, ...rightImages];
  if (!mediaList.some((media) => media.file.type.startsWith("image/"))) {
    WebApp.showAlert("You must upload at least one image.");
    return;
  }
  const formData = new FormData();
  const orderedImages: Image[] = [];

  Object.keys(placeData).forEach((key) => {
    const value = placeData[key] as string | Blob;
    formData.append(key, value);
  });

  // Чередуем изображения: первый из правой, первый из левой и т.д.
  const maxLength = Math.max(leftImages.length, rightImages.length);
  for (let i = 0; i < maxLength; i++) {
    if (leftImages[i]) orderedImages.push(leftImages[i]);
    if (rightImages[i]) orderedImages.push(rightImages[i]);
  }

  // Создаем meta данные
  const metaData = orderedImages.map((image, index) => ({
    order: index + 1,
    main: image.id === mainImageId,
  }));

  // Добавляем файлы и meta в FormData
  orderedImages.forEach((image) => {
    formData.append("files", image.file);
  });
  formData.append("meta", JSON.stringify(metaData));
  try {
    const response = await dispatch(placeAd(formData)).unwrap();
    if (response) {
      dispatch(clearPlace());
      if (later) navigate("../myAds", { replace: true });
      if (withPaid) {
        const invoiceLink = await makePaymentLink(response.id);
        WebApp.openInvoice(invoiceLink, (status) => {
          if (status === "paid")
            navigate("/purachse/success", { replace: true });
        });
      }
      if (!later && !withPaid) navigate("../place/success");
    }
  } catch {
    WebApp.showAlert("Something wrog.\nTry again later", () => {
      dispatch(clearPlaceError());
      navigate("/", { replace: true });
    });
  }
  WebApp.MainButton.hideProgress();
};

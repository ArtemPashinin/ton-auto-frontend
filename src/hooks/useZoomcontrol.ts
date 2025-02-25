import { useEffect } from "react";

export const useZoomControl = (enableZoom = false) => {
  useEffect(() => {
    // Находим или создаем метатег viewport
    let viewportMeta = document.querySelector(
      'meta[name="viewport"]'
    ) as HTMLMetaElement | null;

    if (!viewportMeta) {
      viewportMeta = document.createElement("meta") as HTMLMetaElement;
      viewportMeta.name = "viewport";
      document.head.appendChild(viewportMeta);
    }

    // Устанавливаем атрибуты метатега
    if (enableZoom) {
      viewportMeta.content = "width=device-width, initial-scale=1.0";
    } else {
      viewportMeta.content =
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    }

    // Очистка при размонтировании (опционально)
    return () => {
      viewportMeta!.content =
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    };
  }, [enableZoom]);
};

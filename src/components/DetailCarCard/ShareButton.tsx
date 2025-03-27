import { Button } from "react-bootstrap";

import { faShare } from "@awesome.me/kit-7090d2ba88/icons/classic/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WebApp from "@twa-dev/sdk";
import { Model } from "../../interfaces/vehicle-info.interface";

interface ShareButtonProps {
  advertisementId: string;
  model: Model;
}

export const ShareButton = ({ advertisementId, model }: ShareButtonProps) => {
  const text = encodeURIComponent(`\n${model.make.make} ${model.model}`);
  return (
    <Button
      className="main-outline-button fw-400 py-2 d-flex justify-content-center align-items-center"
      onClick={() => {
        WebApp.openTelegramLink(
          `https://t.me/share/url?url=${
            import.meta.env.VITE_APP_URL
          }?startapp=${advertisementId}&text=${text}`
        );
      }}
    >
      <FontAwesomeIcon icon={faShare} />
    </Button>
  );
};

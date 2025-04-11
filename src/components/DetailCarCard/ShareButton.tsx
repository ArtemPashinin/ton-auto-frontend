import { Button } from "react-bootstrap";

import { faShare } from "@awesome.me/kit-7090d2ba88/icons/classic/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WebApp from "@twa-dev/sdk";
import { Country } from "../../interfaces/user-info.interface";
import {
  Color,
  EngineType,
  Model,
} from "../../interfaces/vehicle-info.interface";

interface ShareButtonProps {
  advertisementId: string;
  model: Model;
  year: number;
  mileage: number;
  engine: EngineType;
  hp: number;
  color: Color;
  fict_country: Country;
}

export const ShareButton = ({
  advertisementId,
  model,
  year,
  mileage,
  engine,
  hp,
  color,
  fict_country,
}: ShareButtonProps) => {
  const text = encodeURIComponent(
    `\n${model.make.make} ${model.model}\n📆${year}\n🔘${mileage}\n⛽️${engine.type}\n🐎${hp}\n🌈${color.color}\n📍${fict_country.title}`
  );
  return (
    <Button
      style={{ minWidth: "45px" }}
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

import { format } from "date-fns";
import { Advertisement } from "../../interfaces/advertisement.interface";
import { MediaSwiper } from "./Swiper";
import style from "./CarCard.module.css";
import { Button } from "react-bootstrap";
import { markFavorite } from "../../utils/mark-favorite";
import { useCallback, useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

interface Props {
  userId: number | undefined;
  toggleFavorite: (advertisementId: string) => void;
}

type DetailCardCardProps = Advertisement & Props;

export const DetailCardCard = ({
  id,
  model,
  price,
  user,
  media,
  year,
  mileage,
  engine,
  hp,
  color,
  description,
  createdAt,
  favoritedBy,
  userId,
  fict_phone,
  toggleFavorite,
}: DetailCardCardProps) => {
  const [favorited, setFavorited] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [phoneNumber] = useState<string>(
    `${user.city.country.phone_code}${user.phone}`
  );
  const [fictPhone] = useState<string | undefined>(fict_phone);

  const mark = async () => {
    await markFavorite(userId, id);
    toggleFavorite(id);
    setFavorited(!favorited);
  };

  const copyToClipBoard = useCallback(() => {
    if (!isCopied) {
      if (navigator.clipboard) {
        let number = phoneNumber;
        if (fictPhone) number = fictPhone;
        navigator.clipboard
          .writeText(number)
          .then(() => {
            setIsCopied(true);
          })
          .catch((err) => {
            console.error("Ошибка при копировании: ", err);
          });
      } else {
        WebApp.showAlert("Copying is not available, please try again later");
      }
    }
  }, [fictPhone, isCopied, phoneNumber]);

  const call = useCallback(() => {
    let number = phoneNumber;
    if (fictPhone) number = fictPhone;
    window.open(`tel:${number}`);
  }, [fictPhone, phoneNumber]);

  useEffect(() => {
    if (favoritedBy.length > 0) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  }, [favoritedBy, userId]);

  return (
    <div className="p-2 defaultText">
      <div className="d-flex justify-content-between fs-20 mb-3">
        <p className="text-start">
          {model.model} {model.make.make}
        </p>
        <p>
          💰{price} {user.city.country.currency}
        </p>
      </div>
      <div className={`d-flex swiper-container mb-3`}>
        <MediaSwiper media={media} />
      </div>
      <div className="d-flex mb-4">
        <div className="text-start lh-16 fw-400 fs-14 pe-3 pt-1 text-nowrap">
          <p>📆 {year}</p>
          <p>🔘 {mileage} km</p>
          <p>⛽️ {engine.type}</p>
          <p>🐎 {hp}</p>
          <p>🌈 {color.color}</p>
          <p>
            📍 {user.city.country.title} {user.city.title}
          </p>
        </div>
        <div className="text-start">
          <p className="fw-300 fs-17 lh-17 text-break">{description}</p>
          <p className={`${style.dateText} fw-400 fs-12`}>
            {format(new Date(createdAt), "MMM dd, yyyy")}
          </p>
        </div>
      </div>
      <div className="d-flex gap-2 mb-2">
        <Button
          className="w-100 main-button py-2"
          onClick={() => {
            call();
          }}
        >
          Call
        </Button>
        <Button
          className="w-100 main-outline-button fw-400 py-2"
          onClick={() => {
            copyToClipBoard();
          }}
        >
          {isCopied ? "Copied" : "Copy number"}
        </Button>
      </div>
      <div>
        <Button
          className={`w-100 py-2 d-flex align-items-center justify-content-center gap-3 ${
            favorited ? "yellow-otline-button" : "main-outline-button"
          } fw-400`}
          onClick={() => {
            WebApp.HapticFeedback.impactOccurred("medium");
            mark();
          }}
        >
          <i
            className={`fa-heart ${style.favoriteIcon} ${
              favorited ? `${style.favorited} fa-solid` : "fa-regular"
            }`}
          ></i>
          {`${favorited ? "In Favorites" : "Add to Favorites"}`}
        </Button>
      </div>
    </div>
  );
};

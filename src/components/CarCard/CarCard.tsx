import { Col, Row, Image, Button } from "react-bootstrap";
import { format } from "date-fns";
import style from "./CarCard.module.css";
import { markFavorite } from "../../utils/mark-favorite";
import { useEffect, useState } from "react";
import { Advertisement } from "../../interfaces/advertisement.interface";
import WebApp from "@twa-dev/sdk";

interface Props {
  userId: number | undefined;
  toggleFavorite: (advertisementId: string) => void;
  toggleIsDetailCardOpened?: (advertisementId: string) => void;
  removeAd?: (advertisementId: string) => void;
  toggleIsOnEditDescription?: (advertisementId: string) => void;
  toggleIsOnMediaEdit?: (advertisementId: string) => void;
}

type CarCardProps = Advertisement & Props;

export const CarCard = ({
  id,
  model,
  year,
  mileage,
  engine,
  hp,
  color,
  price,
  createdAt,
  media,
  user,
  favoritedBy,
  userId,
  toggleFavorite,
  toggleIsDetailCardOpened,
  removeAd,
  toggleIsOnEditDescription,
  toggleIsOnMediaEdit,
}: CarCardProps) => {
  const [favorited, setFavorited] = useState<boolean>(false);
  const [mainMedia] = useState<string | undefined>(
    media.find(({ main }) => main)?.image_url ??
      "https://imgholder.ru/600x300/8493a8/adb9ca&text=No+image"
  );

  const mark = async () => {
    await markFavorite(userId, id);
    toggleFavorite(id);
    console.log(mainMedia);
  };

  useEffect(() => {
    if (favoritedBy.length > 0) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  }, [favoritedBy, userId]);

  return (
    <Row
      className={`${style.carCard} rounded-4 p-2 mb-2`}
      onClick={() => {
        if (toggleIsDetailCardOpened) toggleIsDetailCardOpened(id);
      }}
    >
      <Col className="h-100 p-0 me-2">
        <Image src={mainMedia} className={`${style.cardImage} rounded-3`} />
      </Col>
      <Col
        className={`text-start d-flex justify-content-between flex-column p-0`}
        xs={4}
      >
        <div>
          <p>
            {model.make.make} {model.model}
          </p>
        </div>
        <div>
          <p>📆 {year}</p>
          <p>🔘 {mileage} km</p>
          <p>⛽️ {engine.type}</p>
          <p>🐎 {hp}</p>
          <p>🌈 {color.color}</p>
          <p>📍 {user.city.country.title}</p>
          <p>
            💰 {price} {user.city.country.currency}
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-end">
          <p className={`${style.dateText}`}>
            {format(new Date(createdAt), "MMM dd, yyyy")}
          </p>
          <i
            className={`lg fa-heart ${style.favoriteIcon} ${
              favorited ? `${style.favorited} fa-solid` : "fa-regular"
            }`}
            onClick={(event) => {
              event.stopPropagation();
              mark();
              WebApp.HapticFeedback.impactOccurred("medium");
            }}
          ></i>
        </div>
      </Col>
      {removeAd && toggleIsOnEditDescription && toggleIsOnMediaEdit && (
        <>
          <Col className="p-0  mt-2" xs={12}>
            <Button
              className="w-100 fade-outline-button py-2"
              onClick={(event) => {
                event.stopPropagation();
                toggleIsOnEditDescription(id);
              }}
            >
              Edit
            </Button>
          </Col>
          <Col className="p-0  mt-2" xs={12}>
            <Button
              className="w-100 fade-outline-button py-2"
              onClick={(event) => {
                event.stopPropagation();
                toggleIsOnMediaEdit(id);
              }}
            >
              Manage photos
            </Button>
          </Col>
          <Col className="p-0  mt-2" xs={12}>
            <Button
              className="w-100 danger-button py-2"
              onClick={(event) => {
                event.stopPropagation();
                removeAd(id);
              }}
            >
              Remove ad
            </Button>
          </Col>
        </>
      )}
    </Row>
  );
};

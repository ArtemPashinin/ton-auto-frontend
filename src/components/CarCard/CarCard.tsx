import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Col, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Purchase from "./components/Purchase";
import WebApp from "@twa-dev/sdk";
import EditButton from "./buttons/EditButton";
import RemoveAdButton from "./buttons/RemoveAdButton";
import { Advertisement } from "../../interfaces/advertisement.interface";
import { markFavorite } from "../../redux/slices/favorites-slice/thunks/mark-favorite";
import { userSelector } from "../../redux/slices/user-slice/user-slice";
import { AppDispatch } from "../../redux/store";

import { getNumberWithSpaces } from "../../utils/price";

import style from "./CarCard.module.css";

interface Props {
  isMyAd: boolean;
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
  favoritedBy,
  user,
  paid,
  fict_country,
  isMyAd,
}: CarCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(userSelector);

  const [favorited, setFavorited] = useState<boolean>(false);
  const [mainMedia] = useState<string | undefined>(
    media.find(({ main }) => main)?.image_url ??
      "https://imgholder.ru/600x300/8493a8/adb9ca&text=No+image"
  );
  useEffect(() => {
    setFavorited(favoritedBy.some((user) => user.id === currentUser?.id));
  }, [currentUser, currentUser?.id, favoritedBy, user]);

  return (
    <Row
      className={`${style.carCard} rounded-4 p-2 mb-2`}
      onClick={() => navigate(`../advvertisement/${id}`)}
    >
      {isMyAd && !paid && <Purchase advertisementId={id} />}
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
        <div style={{ lineHeight: 1.4 }}>
          <p>
            <span className="d-inline-block" style={{ minWidth: "1.5rem" }}>
              📆
            </span>
            {year}
          </p>
          <p>
            <span className="d-inline-block" style={{ minWidth: "1.5rem" }}>
              🔘
            </span>
            {mileage} km
          </p>
          <p>
            <span className="d-inline-block" style={{ minWidth: "1.5rem" }}>
              ⛽️
            </span>
            {engine.type}
          </p>
          <p>
            <span className="d-inline-block" style={{ minWidth: "1.5rem" }}>
              🐎
            </span>
            {hp}
          </p>
          <p>
            <span className="d-inline-block" style={{ minWidth: "1.5rem" }}>
              🌈
            </span>
            {color.color}
          </p>
          <p>
            <span className="d-inline-block" style={{ minWidth: "1.5rem" }}>
              📍
            </span>
            {fict_country?.title || user?.city.country.title}
          </p>
          <p className="d-flex align-items-center">
            <span className="d-inline-block" style={{ minWidth: "1.5rem" }}>
              🤝
            </span>
            <span className="d-inline-block lh-1">
              {getNumberWithSpaces(price)}
              {fict_country?.currency || user?.city.country.currency}
            </span>
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
              dispatch(
                markFavorite({ user: currentUser!, advertisementId: id })
              );
              WebApp.HapticFeedback.impactOccurred("medium");
            }}
          ></i>
        </div>
      </Col>

      {isMyAd && (
        <>
          <EditButton id={id} title={"Edit"} path={"editDescription"} />
          <EditButton id={id} title={"Manage photos"} path={"editMedia"} />
          <RemoveAdButton asdvertisementAd={id} />
        </>
      )}
    </Row>
  );
};
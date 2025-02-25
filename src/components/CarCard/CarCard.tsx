import { Col, Row, Image } from "react-bootstrap";
import { format } from "date-fns";
import style from "./CarCard.module.css";
import { useEffect, useState } from "react";
import { Advertisement } from "../../interfaces/advertisement.interface";
import WebApp from "@twa-dev/sdk";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/user-slice/user-slice";
import { AppDispatch } from "../../redux/store";
import { markFavorite } from "../../redux/slices/favorites-slice/thunks/mark-favorite";
import { useNavigate } from "react-router-dom";
import RemoveAdButton from "./buttons/RemoveAdButton";
import Purchase from "./components/Purchase";
import EditButton from "./buttons/EditButton";

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
        <div>
          <p>📆 {year}</p>
          <p>🔘 {mileage} km</p>
          <p>⛽️ {engine.type}</p>
          <p>🐎 {hp}</p>
          <p>🌈 {color.color}</p>
          <p>📍 {user?.city.country.title}</p>
          <p>
            💰 {price} {user?.city.country.currency}
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

import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import WebApp from "@twa-dev/sdk";
import { User } from "../../interfaces/user-info.interface";
import { markFavorite } from "../../redux/slices/favorites-slice/thunks/mark-favorite";
import { userSelector } from "../../redux/slices/user-slice/user-slice";
import { AppDispatch } from "../../redux/store";

import style from "./CarCard.module.css";

interface FavoriteButtonProps {
  advertisementId: string;
  favoritedBy: User[];
}

export const FavoriteButton = ({
  advertisementId,
  favoritedBy,
}: FavoriteButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(userSelector);
  const isFavourite = favoritedBy ? favoritedBy.some(usr => usr.id === user?.id) : false;
  const [favorited, setFavorited] = useState(isFavourite);

  const toggleFavorite = () => {
    dispatch(markFavorite({ user: user!, advertisementId }));
    setFavorited((prev) => !prev);
    WebApp.HapticFeedback.impactOccurred("medium");
  };

  return (
    <Button
      className={`w-100 py-2 d-flex align-items-center justify-content-center gap-3 ${
        favorited ? "yellow-otline-button" : "main-outline-button"
      } fw-400`}
      onClick={toggleFavorite}
    >
      <i
        className={`fa-heart ${style.favoriteIcon} ${
          favorited ? `${style.favorited} fa-solid` : "fa-regular"
        }`}
      ></i>
      {favorited ? "In Favorites" : "Add to Favorites"}
    </Button>
  );
};

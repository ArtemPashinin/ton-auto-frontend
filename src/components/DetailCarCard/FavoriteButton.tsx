import { Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { markFavorite } from "../../redux/slices/favorites-slice/thunks/mark-favorite";
import { userSelector } from "../../redux/slices/user-slice/user-slice";
import WebApp from "@twa-dev/sdk";
import { User } from "../../interfaces/user-info.interface";
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
  const [favorited, setFavorited] = useState(favoritedBy.length > 0);

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

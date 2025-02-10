import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch } from "../redux/store";
import { clearFavorites } from "../redux/slices/favorites-slice/favorites-slice";
import { fetchFavorites } from "../redux/slices/favorites-slice/thunks/fetch-favorites";
import { userSelector } from "../redux/slices/user-slice/user-slice";
import { favoritesPageSelector } from "../redux/slices/page-slice/page-slice";

export const useFavorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(userSelector);
  const favoritesPage = useSelector(favoritesPageSelector);

  useEffect(() => {
    if (user) {
      dispatch(clearFavorites());
      dispatch(fetchFavorites(user.id!));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (user && favoritesPage > 1) dispatch(fetchFavorites(user.id!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoritesPage]);
};

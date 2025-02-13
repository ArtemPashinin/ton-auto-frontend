import { useDispatch, useSelector } from "react-redux";
import { useFavorites } from "../../hooks/useFavorites";
import { setNextPage } from "../../redux/slices/page-slice/page-slice";

import {
  favoritesCountSelector,
  favoritesLoadingSelector,
  favoritesSelector,
} from "../../redux/slices/favorites-slice/favorites-slice";
import CarCardList from "../CarCard/CarCardList";
import { useCallback } from "react";
import { AppDispatch } from "../../redux/store";

const Favorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector(favoritesSelector);
  const favoritesCount = useSelector(favoritesCountSelector);
  const favoritesLoading = useSelector(favoritesLoadingSelector);

  useFavorites();

  const fetchNextPageFavorites = useCallback(() => {
    dispatch(setNextPage({ pageType: "favoritesPage" }));
  }, [dispatch]);

  return (
    <div>
      <p className="defaultText text-start mb-4">Favorites</p>
      <CarCardList
        advertisements={favorites}
        advertisementsCount={favoritesCount}
        loading={favoritesLoading}
        fetchNextPageAdvertisements={fetchNextPageFavorites} isMyAds={false}      />
    </div>
  );
};

export default Favorites;

import { CarCardList } from "../CarCard/CarCardList";
import { DetailCardCard } from "../CarCard/DetailCarCard";
import { useFavoritesContext } from "./FavoritesContext";

export const Favorites = () => {
  const {
    advertisements,
    user,
    fetchNextPageAdvertisements,
    toggleFavorite,
    isDetailCardOpened,
    openedAdvertisement,
    advertisementsCount,
    toggleIsDetailCardOpened,
  } = useFavoritesContext();

  return (
    <>
      <div className="p-2 tab">
        {!isDetailCardOpened && (
          <>
            <p className="defaultText text-start mb-4">Favorites</p>
            <CarCardList
              advertisementsCount={advertisementsCount}
              advertisements={advertisements}
              userId={user.id}
              fetchNextPageAdvertisements={fetchNextPageAdvertisements}
              toggleFavorite={toggleFavorite}
              toggleIsDetailCardOpened={toggleIsDetailCardOpened}
            />
          </>
        )}
        {isDetailCardOpened && (
          <>
            <DetailCardCard
              {...openedAdvertisement}
              toggleFavorite={toggleFavorite}
              userId={user.id}
            />
          </>
        )}
      </div>
    </>
  );
};

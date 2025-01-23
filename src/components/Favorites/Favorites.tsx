import { Spinner } from "react-bootstrap";
import { CarCardList } from "../CarCard/CarCardList";
import { DetailCardCard } from "../CarCard/DetailCarCard";
import { useFavoritesContext } from "./FavoritesContext";

export const Favorites = () => {
  const {
    advertisements,
    user,
    loading,
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
            {loading ? (
              <div className="mainText d-flex align-items-center justify-content-center vh-75">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <>
                {advertisementsCount > 0 ? (
                  <>
                    <CarCardList
                      advertisementsCount={advertisementsCount}
                      advertisements={advertisements}
                      userId={user.id}
                      fetchNextPageAdvertisements={fetchNextPageAdvertisements}
                      toggleFavorite={toggleFavorite}
                      toggleIsDetailCardOpened={toggleIsDetailCardOpened}
                    />
                  </>
                ) : (
                  <>
                    <div className="vh-75 d-flex align-items-center justify-content-center subtitleText fs-20">
                      <p>No results</p>
                    </div>
                  </>
                )}
              </>
            )}
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

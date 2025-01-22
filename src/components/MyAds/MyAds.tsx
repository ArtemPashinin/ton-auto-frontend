import { Spinner } from "react-bootstrap";
import { CarCardList } from "../CarCard/CarCardList";
import { DetailCardCard } from "../CarCard/DetailCarCard";
import { EditForm } from "./EditForm";
import { EditMedia } from "./EditMedia";
import { useMyAdsContext } from "./MyAdsContext";

export const MyAds = () => {
  const {
    advertisements,
    user,
    fetchNextPageAdvertisements,
    toggleFavorite,
    isDetailCardOpened,
    isOnEditDescription,
    isOnMediaEdit,
    advertisementOnEdit,
    openedAdvertisement,
    advertisementsCount,
    mediaOnEdit,
    loading,
    toggleIsDetailCardOpened,
    removeAd,
    toggleIsOnEditDescription,
    toggleIsOnMediaEdit,
  } = useMyAdsContext();

  if (loading) {
    return (
      <div className="tab mainText d-flex align-items-center justify-content-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="p-2 tab">
      {/* Показываем "Мои объявления", если ничего не редактируется */}
      {!isDetailCardOpened && !isOnEditDescription && !isOnMediaEdit && (
        <>
          <p className="defaultText text-start mb-4">My Ads</p>
          <CarCardList
            removeAd={removeAd}
            toggleIsOnEditDescription={toggleIsOnEditDescription}
            advertisementsCount={advertisementsCount}
            advertisements={advertisements}
            userId={user.id}
            fetchNextPageAdvertisements={fetchNextPageAdvertisements}
            toggleFavorite={toggleFavorite}
            toggleIsDetailCardOpened={toggleIsDetailCardOpened}
            toggleIsOnMediaEdit={toggleIsOnMediaEdit}
          />
        </>
      )}

      {/* Показываем детальную карточку, если она открыта */}
      {isDetailCardOpened && (
        <DetailCardCard
          {...openedAdvertisement}
          toggleFavorite={toggleFavorite}
          userId={user.id}
        />
      )}

      {/* Показываем форму редактирования описания, если она открыта */}
      {isOnEditDescription && (
        <EditForm
          {...advertisementOnEdit}
          toggleIsOnEditDescription={toggleIsOnEditDescription}
        />
      )}

      {/* Показываем редактирование медиа, если оно открыто */}
      {isOnMediaEdit && (
        <EditMedia
          toggleIsOnMediaEdit={toggleIsOnMediaEdit}
          media={mediaOnEdit}
        />
      )}
    </div>
  );
};

import { VehicleTypeList } from "../VehicleType/VehicleTypeList";
import { CarCardList } from "../CarCard/CarCardList";
import { SearchBar } from "./SearchBar";
import { InfoBar } from "./InfoBar";
import { useSearchContext } from "./SearchContext";
import { DetailCardCard } from "../CarCard/DetailCarCard";
import { Spinner } from "react-bootstrap";

export const Search = () => {
  const {
    advertisements,
    fetchNextPageAdvertisements,
    currentQuery,
    toggleFavorite,
    isDetailCardOpened,
    openedAdvertisement,
    user,
    loading,
    vehicleType,
    updateVehicleType,
    toggleIsDetailCardOpened,
    advertisementsCount,
  } = useSearchContext();

  return (
    <div className="search p-2 tab">
      {!isDetailCardOpened && (
        <>
          <VehicleTypeList
            onVehicleTypeChange={updateVehicleType}
            activeVehicleType={vehicleType}
          />
          <SearchBar />
          <InfoBar />
          {!loading ? (
            <CarCardList
              advertisementsCount={advertisementsCount}
              toggleFavorite={toggleFavorite}
              userId={currentQuery.userId}
              advertisements={advertisements}
              fetchNextPageAdvertisements={fetchNextPageAdvertisements}
              toggleIsDetailCardOpened={toggleIsDetailCardOpened}
            />
          ) : (
            <div className="mainText d-flex align-items-center justify-content-center vh-55">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
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
  );
};

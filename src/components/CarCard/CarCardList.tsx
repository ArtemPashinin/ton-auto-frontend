import { Button, Container } from "react-bootstrap";
import { CarCard } from "./CarCard";
import { Advertisement } from "../../interfaces/advertisement.interface";

interface CarCardList {
  advertisements: Advertisement[];
  fetchNextPageAdvertisements: () => void;
  userId: number | undefined;
  toggleFavorite: (advertisementId: string) => void;
  toggleIsDetailCardOpened?: (advertisementId: string) => void;
  advertisementsCount: number;
  removeAd?: (advertisementId: string) => void;
  toggleIsOnEditDescription?: (advertisementId: string) => void;
  toggleIsOnMediaEdit?: (advertisementId: string) => void;
}

export const CarCardList = ({
  advertisements,
  fetchNextPageAdvertisements,
  toggleFavorite,
  toggleIsDetailCardOpened,
  advertisementsCount,
  userId,
  removeAd,
  toggleIsOnEditDescription,
  toggleIsOnMediaEdit,
}: CarCardList) => {
  if (advertisements) {
    return (
      <>
        <Container>
          {advertisements.map((advertisement, index) => (
            <CarCard
              {...advertisement}
              userId={userId}
              removeAd={removeAd}
              toggleIsOnEditDescription={toggleIsOnEditDescription}
              toggleFavorite={toggleFavorite}
              toggleIsDetailCardOpened={toggleIsDetailCardOpened}
              toggleIsOnMediaEdit={toggleIsOnMediaEdit}
              key={index}
            />
          ))}
        </Container>
        {advertisements.length < advertisementsCount && (
          <Button
            className="w-100 main-button mb-3 py-2"
            onClick={() => fetchNextPageAdvertisements()}
          >
            Load more
          </Button>
        )}
      </>
    );
  }
};

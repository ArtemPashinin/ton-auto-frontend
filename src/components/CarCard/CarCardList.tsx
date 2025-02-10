import { Button, Container, Spinner } from "react-bootstrap";
import { CarCard } from "./CarCard";
import { Advertisement } from "../../interfaces/advertisement.interface";
import style from "./CarCardList.module.css";
import PageSpinner from "../placeholders/PageSpinner";

interface CarCardListProps {
  advertisements: Advertisement[];
  fetchNextPageAdvertisements: () => void;
  userId?: number;
  loading: boolean;
  advertisementsCount: number;
}

const CarCardList = ({
  advertisements,
  fetchNextPageAdvertisements,
  advertisementsCount,
  loading,
}: CarCardListProps) => {
  if (advertisements.length === 0 && loading) return <PageSpinner />;

  return (
    <div className={style.carCardList}>
      <Container>
        {advertisements.map((advertisement) => (
          <CarCard key={advertisement.id} {...advertisement} />
        ))}
      </Container>
      {advertisements.length < advertisementsCount && (
        <Button
          className="w-100 main-button py-2"
          onClick={fetchNextPageAdvertisements}
          disabled={loading}
        >
          {loading ? (
            <Spinner animation="border" role="status" size="sm">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            "Load more"
          )}
        </Button>
      )}
    </div>
  );
};

export default CarCardList;

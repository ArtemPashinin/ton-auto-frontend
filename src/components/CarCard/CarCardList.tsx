import { Container } from "react-bootstrap";
import { CarCard } from "./CarCard";
import { useSearchContext } from "../Search/SearchContext";

export const CarCardList = () => {
  const { advertisements } = useSearchContext();
  return (
    <>
      <Container>
        {advertisements.map((advertisement, index) => (
          <CarCard {...advertisement} key={index} />
        ))}
      </Container>
    </>
  );
};

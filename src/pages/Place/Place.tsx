import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { usePlace } from "../../hooks/usePlace";
import PlaceForm from "../../components/PlaceForm/PlaceForm";

export const PlacePage = () => {
  usePlace();

  return (
    <PageWrapper hideTabBar={true} backButton={true}>
      <PlaceForm />
    </PageWrapper>
  );
};

export default PlacePage;

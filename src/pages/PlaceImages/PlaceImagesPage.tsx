import { useSelector } from "react-redux";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import PlaceImages from "../../components/PlaceImage/PlaceImage";
import { placeImagesSelector } from "../../redux/slices/place-sclice/place-slice";

const PlaceImagesPage = () => {
  const images = useSelector(placeImagesSelector)

  return (
    <PageWrapper backButton hideTabBar>
      <PlaceImages left={images.leftImages} right={images.rightImages} mainId={images.mainImageId}/>
    </PageWrapper>
  );
};

export default PlaceImagesPage;

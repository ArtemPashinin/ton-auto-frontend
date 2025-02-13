import { useDispatch, useSelector } from "react-redux";
import { VehicleTypeList } from "../VehicleTypeBar/VehicleTypeList";
import InfoBar from "./InfoBar";
import { AppDispatch } from "../../redux/store";
import { useCallback } from "react";
import SearchBar from "./SearchBar/SearchBar";
import CarCardList from "../CarCard/CarCardList";
import {
  advertisementCountSelector,
  advertisementLoadingSelector,
  advertisementsSelector,
} from "../../redux/slices/advertisement-slice/advertisement-slice";
import { setNextPage } from "../../redux/slices/page-slice/page-slice";
import { useAdvertisements } from "../../hooks/useAdvertisements";

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const advertisementsCount = useSelector(advertisementCountSelector);
  const advertisements = useSelector(advertisementsSelector);
  const loading = useSelector(advertisementLoadingSelector);

  useAdvertisements();

  const fetchNextPageAdvertisements = useCallback(() => {
    dispatch(setNextPage({ pageType: "searchPage" }));
  }, [dispatch]);

  return (
    <div>
      <VehicleTypeList />
      <SearchBar />
      <InfoBar />
      <CarCardList
        loading={loading}
        advertisements={advertisements}
        advertisementsCount={advertisementsCount}
        fetchNextPageAdvertisements={fetchNextPageAdvertisements} isMyAds={false}      />
    </div>
  );
};

export default Search;

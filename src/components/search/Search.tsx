import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InfoBar from "./InfoBar";
import SearchBar from "./SearchBar/SearchBar";
import {
  advertisementCountSelector,
  advertisementLoadingSelector,
  advertisementsSelector,
} from "../../redux/slices/advertisement-slice/advertisement-slice";
import { setNextPage } from "../../redux/slices/page-slice/page-slice";
import { AppDispatch } from "../../redux/store";
import CarCardList from "../CarCard/CarCardList";
import { VehicleTypeList } from "../VehicleTypeBar/VehicleTypeList";

import { useAdvertisements } from "../../hooks/useAdvertisements";
import { useStartApp } from "../../hooks/useStartApp";

const Search = () => {
  useStartApp();
  const dispatch = useDispatch<AppDispatch>();
  const advertisementsCount = useSelector(advertisementCountSelector);
  const advertisements = useSelector(advertisementsSelector);
  const loading = useSelector(advertisementLoadingSelector);

  const [collabseOpen, setCollapseOpen] = useState<boolean>(false);

  useAdvertisements();

  const fetchNextPageAdvertisements = useCallback(() => {
    dispatch(setNextPage({ pageType: "searchPage" }));
  }, [dispatch]);

  return (
    <div>
      <VehicleTypeList />
      <SearchBar open={collabseOpen} setOpen={setCollapseOpen} />
      <InfoBar setOpen={setCollapseOpen} />
      <CarCardList
        loading={loading}
        advertisements={advertisements}
        advertisementsCount={advertisementsCount}
        fetchNextPageAdvertisements={fetchNextPageAdvertisements}
        isMyAds={false}
      />
    </div>
  );
};

export default Search;

import { useDispatch, useSelector } from "react-redux";
import {
  myAdsCountSelector,
  myAdsLoadingSelector,
  myAdsSelector,
} from "../../redux/slices/my-ads-slice/my-ads-slice";
import { useCallback } from "react";
import { setNextPage } from "../../redux/slices/page-slice/page-slice";
import { AppDispatch } from "../../redux/store";
import CarCardList from "../CarCard/CarCardList";
import { useMyAds } from "../../hooks/useMyAds";

const MyAds = () => {
  const dispatch = useDispatch<AppDispatch>();
  const myAds = useSelector(myAdsSelector);
  const myAdsCount = useSelector(myAdsCountSelector);
  const myAdsLoading = useSelector(myAdsLoadingSelector);

  useMyAds();

  const fetchNextPageMyAds = useCallback(() => {
    dispatch(setNextPage({ pageType: "myAdsPage" }));
  }, [dispatch]);

  return (
    <div>
      <p className="defaultText text-start mb-4">MyAds</p>
      <CarCardList
        isMyAds
        advertisements={myAds}
        advertisementsCount={myAdsCount}
        loading={myAdsLoading}
        fetchNextPageAdvertisements={fetchNextPageMyAds}
      />
    </div>
  );
};

export default MyAds;

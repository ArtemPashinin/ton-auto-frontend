import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch } from "../redux/store";
import { userSelector } from "../redux/slices/user-slice/user-slice";
import {
  clearPage,
  myAdsPageSelector,
} from "../redux/slices/page-slice/page-slice";
import { fetchMyAds } from "../redux/slices/my-ads-slice/thunks/fetch-my-ads";
import { clearMyAds } from "../redux/slices/my-ads-slice/my-ads-slice";

export const useMyAds = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(userSelector);
  const MyAdsPage = useSelector(myAdsPageSelector);

  useEffect(() => {
    if (user) {
      dispatch(clearMyAds());
      dispatch(fetchMyAds(user.id!));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (user && MyAdsPage > 1) dispatch(fetchMyAds(user.id!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MyAdsPage]);

  useEffect(() => {
    return () => {
      dispatch(clearPage({ pageType: "myAdsPage" }));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

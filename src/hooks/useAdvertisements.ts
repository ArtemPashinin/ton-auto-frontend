import { useDispatch, useSelector } from "react-redux";
import {useEffect, useRef} from "react";
import { AppDispatch } from "../redux/store";
import { fetchAdvertisements } from "../redux/slices/advertisement-slice/thunks/fetch-advertisement";
import {
  advertisementsSelector,
  clearAdvertisements
} from "../redux/slices/advertisement-slice/advertisement-slice";
import {
  // resetFilters,
  searchFiltersSelector,
  // setFilter,
} from "../redux/slices/search-filters-slice/search-filters-slice";
import { userSelector } from "../redux/slices/user-slice/user-slice";
import {
  // clearPage,
  searchPageSelector, setPage,
} from "../redux/slices/page-slice/page-slice";

export const useAdvertisements = () => {
  const dispatch = useDispatch<AppDispatch>();
  const advertisements = useSelector(advertisementsSelector)
  const filters = useSelector(searchFiltersSelector);
  const user = useSelector(userSelector);
  const searchPage = useSelector(searchPageSelector);
  const flag = useRef<boolean>(true)

  useEffect(() => {
    if (user) {
      dispatch(clearAdvertisements());
      dispatch(fetchAdvertisements(filters));
      dispatch(setPage({pageType: "searchPage", page:1}))
    }
    return () => {
      dispatch(clearAdvertisements());
      // dispatch(fetchAdvertisements(filters));
      dispatch(setPage({pageType: "searchPage", page:1}))
    }
  }, [dispatch, filters, user]);

  useEffect(() => {
    if (flag.current) {
      flag.current = false;
      return;
    }

    const adsCount = advertisements.length < 10 ? 1 : advertisements.length / 10;
    if (user && searchPage > adsCount){
      dispatch(fetchAdvertisements(filters))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPage]);

  // useEffect(() => {
  //   return () => {
  //     // dispatch(resetFilters());
  //     // dispatch(clearAdvertisements());
  //     dispatch(clearPage({ pageType: "searchPage" }));
  //     if (user)
  //       dispatch(setFilter({ key: "country", value: user.city.country.id }));
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
};

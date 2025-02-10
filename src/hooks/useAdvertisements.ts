import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch } from "../redux/store";
import { fetchAdvertisements } from "../redux/slices/advertisement-slice/thunks/fetch-advertisement";
import { clearAdvertisements } from "../redux/slices/advertisement-slice/advertisement-slice";
import {
  resetFilters,
  searchFiltersSelector,
  setFilter,
} from "../redux/slices/search-filters-slice/search-filters-slice";
import { userSelector } from "../redux/slices/user-slice/user-slice";
import {
  clearPage,
  searchPageSelector,
} from "../redux/slices/page-slice/page-slice";

export const useAdvertisements = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector(searchFiltersSelector);
  const user = useSelector(userSelector);
  const searchPage = useSelector(searchPageSelector);

  useEffect(() => {
    if (user) {
      dispatch(clearAdvertisements());
      dispatch(fetchAdvertisements(filters));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filters]);

  useEffect(() => {
    if (user && searchPage > 1) dispatch(fetchAdvertisements(filters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPage]);

  useEffect(() => {
    return () => {
      dispatch(resetFilters());
      dispatch(clearAdvertisements());
      dispatch(clearPage({ pageType: "searchPage" }));
      if (user)
        dispatch(setFilter({ key: "country", value: user.city.country.id }));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

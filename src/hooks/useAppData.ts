import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../redux/slices/user-slice/thunks/fetch-user";
import { fetchMakes } from "../redux/slices/data-slice/thunks/fetch-makes";
import { fetchCountries } from "../redux/slices/data-slice/thunks/fetch-countries";
import { AppDispatch } from "../redux/store";
import { fetchEngineTypes } from "../redux/slices/data-slice/thunks/fetch-engine-types";


export const useAppData = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchCountries());
    dispatch(fetchMakes());
    dispatch(fetchEngineTypes());
  }, [dispatch]);
};

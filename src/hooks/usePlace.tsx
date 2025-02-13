import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { userSelector } from "../redux/slices/user-slice/user-slice";
import { useEffect } from "react";
import { setField } from "../redux/slices/place-sclice/place-slice";

export const usePlace = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(userSelector);

  useEffect(() => {
    if (user) {
      dispatch(setField({ key: "user_id", value: user?.id }));
    }
  }, [dispatch, user]);
};

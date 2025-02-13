import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PropsWithChildren, useEffect } from "react";
import {
  userLoadingSelector,
  userSelector,
} from "../../redux/slices/user-slice/user-slice";

const RequireAuth = ({ children }: PropsWithChildren) => {
  const user = useSelector(userSelector);
  const loading = useSelector(userLoadingSelector);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && location.pathname === "/registration") {
      navigate("/", { replace: true });
    }
  }, [user, location.pathname, navigate]);

  if (loading && !user) return null;

  return user ? children : <Navigate to="/registration" replace />;
};

export default RequireAuth;

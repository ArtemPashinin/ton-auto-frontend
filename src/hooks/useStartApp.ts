import { useNavigate, useSearchParams } from "react-router-dom";

export const useStartApp = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const advvertisementId = params.get("tgWebAppStartParam");
  if (advvertisementId) {
    navigate(`advvertisement/${advvertisementId}`, { replace: true });
  }
};

import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppRouteData } from "../../../enums/app-routes";

import style from "./TabBarButton.module.css";

const TabBarButton = ({ path, iconData, title, margin }: AppRouteData) => {
  const currentPath = useLocation().pathname;
  return (
    <div
      className={`defaultText ${
        currentPath === path ? style.pressed : ""
      } user-select-none pb-1 pt-2 px-0 d-flex flex-column justify-content-end`}
    >
      <Link
        to={path}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <FontAwesomeIcon {...iconData} />
        <p className={`mt-1 ${style.buttonTitle} ${margin}`}>{title}</p>
      </Link>
    </div>
  );
};

export default TabBarButton;

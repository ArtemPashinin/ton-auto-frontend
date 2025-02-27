import {
  faHeart,
  faMagnifyingGlass,
  faStar,
  faUser,
} from "@awesome.me/kit-7090d2ba88/icons/classic/light";
import { faCirclePlus } from "@awesome.me/kit-7090d2ba88/icons/classic/solid";
import WebApp from "@twa-dev/sdk";
import { IconData } from "../interfaces/icon-data.interface";

const createRoute = (
  path: string,
  title: string,
  icon: IconData,
  margin: string = "mt-2"
): AppRouteData => ({
  path,
  title,
  margin,
  iconData: icon,
});

export interface AppRouteData {
  path: string;
  iconData: IconData;
  title: string;
  margin?: string;
}

export const appRoutesData: AppRouteData[] = [
  createRoute("/", "Search", {
    icon: faMagnifyingGlass,
    size: "xl",
    color: WebApp.themeParams.text_color,
  }),
  createRoute("/favorites", "Favorites", {
    icon: faHeart,
    size: "xl",
    color: WebApp.themeParams.text_color,
  }),
  createRoute(
    "/place",
    "Place ad",
    {
      icon: faCirclePlus,
      size: "2x",
      color: WebApp.themeParams.button_color,
    },
    "0"
  ),
  createRoute("/myAds", "My ads", {
    icon: faStar,
    size: "xl",
    color: WebApp.themeParams.text_color,
  }),
  createRoute("/account", "Account", {
    icon: faUser,
    size: "xl",
    color: WebApp.themeParams.text_color,
  }),
];

import {
  faHeart,
  faMagnifyingGlass,
  faStar,
  faUser,
} from "@awesome.me/kit-7090d2ba88/icons/classic/regular";
import { Tab } from "./Tab.enum";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCirclePlus } from "@awesome.me/kit-7090d2ba88/icons/classic/solid";
import WebApp from "@twa-dev/sdk";

interface MenuButtonData {
  icon: IconProp;
  title: string;
  color?: string;
  tab: Tab;
}

export const menuButtonData: MenuButtonData[] = [
  {
    icon: faMagnifyingGlass,
    title: "Search",
    tab: Tab.SEARCH,
  },
  {
    icon: faHeart,
    title: "Favorites",
    tab: Tab.FAVORITES,
  },
  {
    icon: faCirclePlus,
    title: "Places",
    color: WebApp.themeParams.button_color,
    tab: Tab.PLACE,
  },
  {
    icon: faStar,
    title: "My ad",
    tab: Tab.MY_ADS,
  },
  {
    icon: faUser,
    title: "Account",
    tab: Tab.ACCOUNT,
  },
];

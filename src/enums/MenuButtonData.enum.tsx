import { Tab } from "./Tab.enum";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faCirclePlus } from "@awesome.me/kit-7090d2ba88/icons/classic/solid";
import WebApp from "@twa-dev/sdk";
import {
  faHeart,
  faMagnifyingGlass,
  faStar,
  faUser,
} from "@awesome.me/kit-7090d2ba88/icons/classic/light";

interface MenuButtonData {
  icon: IconProp;
  title: string;
  color?: string;
  size: SizeProp;
  margin?: string;
  tab: Tab;
}

export const menuButtonData: MenuButtonData[] = [
  {
    icon: faMagnifyingGlass,
    title: "Search",
    tab: Tab.SEARCH,
    size: "xl",
    margin: "mt-2",
  },
  {
    icon: faHeart,
    title: "Favorites",
    tab: Tab.FAVORITES,
    size: "xl",
    margin: "mt-2",
  },
  {
    icon: faCirclePlus,
    title: "Place ad",
    color: WebApp.themeParams.button_color,
    tab: Tab.PLACE,
    size: "2x",
  },
  {
    icon: faStar,
    title: "My ads",
    tab: Tab.MY_ADS,
    size: "xl",
    margin: "mt-2",
  },
  {
    icon: faUser,
    title: "Account",
    tab: Tab.ACCOUNT,
    size: "xl",
    margin: "mt-2",
  },
];

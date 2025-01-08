import { Tab } from "./Tab.enum";

interface MenuButtonData {
  icon: string;
  title: string;
  tab: Tab;
}
export const menuButtonData: MenuButtonData[] = [
  { icon: "fa-solid fa-magnifying-glass", title: "Search", tab: Tab.SEARCH },
  { icon: "fa-regular fa-heart", title: "Favorites", tab: Tab.FAVORITES },
  { icon: "fa-solid fa-plus", title: "Places", tab: Tab.PLACE },
  { icon: "fa-regular fa-star", title: "My ad", tab: Tab.MY_ADS },
  { icon: "fa-solid fa-person", title: "Aaccount", tab: Tab.ACCOUNT },
];

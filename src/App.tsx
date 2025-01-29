import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { MenuList } from "./components/Menu/MenuList";
import { Tab } from "./enums/Tab.enum";
import { Search } from "./components/Search/Search";
import { Favorites } from "./components/Favorites/Favorites";
import { Place } from "./components/Place/Place";
import { MyAds } from "./components/MyAds/MyAds";
import { Account } from "./components/Account/Account";
import { Error } from "./components/Error/Error";
import axios from "axios";
import WebApp from "@twa-dev/sdk";
import { Location } from "./components/Location/Location";
import { useMenuContext } from "./components/Menu/MenuContext";
import { PlaceProvider } from "./components/Place/PlaceContext";
import { SearchProvider } from "./components/Search/SearchContext";
import { FavoritesProvider } from "./components/Favorites/FavoritesContext";
import { MyAdsProvider } from "./components/MyAds/MyAdsContext";
import TelegramAnalytics from "@telegram-apps/analytics";

function App() {
  // TelegramAnalytics.init({
  //   token:
  //     "eyJhcHBfbmFtZSI6InRvbl9hdXRvX21pbmlfYXBwIiwiYXBwX3VybCI6Imh0dHBzOi8vdC5tZS90b25hdXRvYXBwX2JvdC90b25fYXV0b19hcHAiLCJhcHBfZG9tYWluIjoiaHR0cHM6Ly92dXpjcm1wbHVzLnN0b3JlLyJ9!IG7qVs9OcFNxeZAtSJ6RubSOCpX/Ull9ISNHXxm70Cg=",
  //   appName: "ton_auto_mini_app",
  // });

  const { isVisible: isMenuVisible, tab } = useMenuContext();
  const [isUserRegistred, setUserRegistred] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchUser = useCallback(async () => {
    try {
      const user = WebApp.initDataUnsafe.user!;
      if (!user) {
        setError(true);
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/user`,
        { params: { tgId: user.id } }
      );
      if (response.data === "") {
        setUserRegistred(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const components: Record<Tab, JSX.Element> = {
    [Tab.SEARCH]: (
      <SearchProvider>
        <Search />
      </SearchProvider>
    ),
    [Tab.FAVORITES]: (
      <FavoritesProvider>
        <Favorites />
      </FavoritesProvider>
    ),
    [Tab.PLACE]: (
      <PlaceProvider>
        <Place />
      </PlaceProvider>
    ),
    [Tab.MY_ADS]: (
      <MyAdsProvider>
        <MyAds />
      </MyAdsProvider>
    ),
    [Tab.ACCOUNT]: <Account />,
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser, isUserRegistred]);

  if (error) {
    return <Error />;
  }

  if (!!isUserRegistred) {
    return <Location setUserRegistred={setUserRegistred} />;
  }

  return (
    <div className="App">
      {components[tab]}
      {isMenuVisible && <MenuList />}
    </div>
  );
}

export default App;

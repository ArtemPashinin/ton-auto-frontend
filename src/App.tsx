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

function App() {
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
    [Tab.FAVORITES]: <Favorites />,
    [Tab.PLACE]: (
      <PlaceProvider>
        <Place />
      </PlaceProvider>
    ),
    [Tab.MY_ADS]: <MyAds />,
    [Tab.ACCOUNT]: <Account />,
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser, isUserRegistred]);

  if (error) {
    return <Error />;
  }

  if (!isUserRegistred) {
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

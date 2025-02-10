import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Search from "./pages/Search/SearchPage";
import Favorites from "./pages/Favorites/Favorites";
import Place from "./pages/Place/Place";
import MyAds from "./pages/MyAds/MyAdsPage";
import Account from "./pages/Account/AccountPage";
import { useAppData } from "./hooks/useAppData";
import Advertisement from "./pages/Advertisement/AdvertisementPage";
import NotFoundPage from "./pages/404/404";

function App() {
  useAppData();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="place" element={<Place />} />
        <Route path="myads" element={<MyAds />} />
        <Route path="account" element={<Account />} />
        <Route path="advvertisement/:id" element={<Advertisement />} />
        <Route path="404" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

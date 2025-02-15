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
import RegistrationPage from "./pages/Registration/RegistrationPage";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import PlaceImagesPage from "./pages/PlaceImages/PlaceImagesPage";
import SuccessPage from "./pages/Success/SuccessPage";
import EditDescriptionPage from "./pages/EditDescription/EditDescriptionPage";
import MediaPage from "./pages/Media/MediaPage";

function App() {
  useAppData();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Search />
            </RequireAuth>
          }
        />
        <Route
          path="favorites"
          element={
            <RequireAuth>
              <Favorites />
            </RequireAuth>
          }
        />
        <Route
          path="place"
          element={
            <RequireAuth>
              <Place />
            </RequireAuth>
          }
        />
        <Route
          path="myads"
          element={
            <RequireAuth>
              <MyAds />
            </RequireAuth>
          }
        />
        <Route
          path="account"
          element={
            <RequireAuth>
              <Account />
            </RequireAuth>
          }
        />
        <Route
          path="place/images"
          element={
            <RequireAuth>
              <PlaceImagesPage />
            </RequireAuth>
          }
        />
        <Route
          path="place/success"
          element={
            <RequireAuth>
              <SuccessPage />
            </RequireAuth>
          }
        />
        <Route
          path="advvertisement/:id"
          element={
            <RequireAuth>
              <Advertisement />
            </RequireAuth>
          }
        />
        <Route
          path="media/:url"
          element={
            <RequireAuth>
              <MediaPage />
            </RequireAuth>
          }
        />
        <Route
          path="myAds/:id/editDescription"
          element={
            <RequireAuth>
              <EditDescriptionPage />
            </RequireAuth>
          }
        />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="registration" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

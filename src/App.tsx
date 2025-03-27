import { Route, Routes, BrowserRouter } from "react-router-dom";

import RequireAuth from "./components/RequireAuth/RequireAuth";
import NotFoundPage from "./pages/404/404";
import Account from "./pages/Account/AccountPage";
import Advertisement from "./pages/Advertisement/AdvertisementPage";
import EditDescriptionPage from "./pages/EditDescription/EditDescriptionPage";
import EditMediaPage from "./pages/EditMedia/EditMedia";
import Favorites from "./pages/Favorites/Favorites";
import MediaPage from "./pages/Media/MediaPage";
import MyAds from "./pages/MyAds/MyAdsPage";
import Place from "./pages/Place/Place";
import PlaceImagesPage from "./pages/PlaceImages/PlaceImagesPage";
import PurchasePage from "./pages/Purchase/PurchasePage";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import Search from "./pages/Search/SearchPage";
import SuccessPage from "./pages/Success/SuccessPage";
import SuccessPaymentPage from "./pages/SuccessPayment/SuccessPayment";

import { useAppData } from "./hooks/useAppData";
import { useOverflowHidden } from "./hooks/useOverflow";
import { useZoomControl } from "./hooks/useZoomcontrol";

import "./App.css";

function App() {
  useAppData();
  useOverflowHidden(true);
  useZoomControl();

  return (
    <>
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
          <Route
            path="myAds/:id/editMedia"
            element={
              <RequireAuth>
                <EditMediaPage />
              </RequireAuth>
            }
          />
          <Route
            path="purchase/:id"
            element={
              <RequireAuth>
                <PurchasePage />
              </RequireAuth>
            }
          />
          <Route
            path="purachse/success"
            element={
              <RequireAuth>
                <SuccessPaymentPage />
              </RequireAuth>
            }
          />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="registration" element={<RegistrationPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
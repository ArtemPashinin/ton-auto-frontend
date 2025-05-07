import { useState, useMemo, useEffect } from "react";
import { Stack, InputGroup, Spinner, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { faUser } from "@awesome.me/kit-7090d2ba88/icons/classic/light";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WebApp from "@twa-dev/sdk";
import CitySelect from "./CitySelect";
import CountrySelect from "./CountrySelect";
import { UserDto } from "../../interfaces/dto/user.dto";
import { City } from "../../interfaces/user-info.interface";
import { countriesSelector } from "../../redux/slices/data-slice/data-slice";
import { updateUser } from "../../redux/slices/user-slice/thunks/update-user";
import {
  userSelector,
  userLoadingSelector,
} from "../../redux/slices/user-slice/user-slice";
import { AppDispatch } from "../../redux/store";

import { fetchCities } from "../../utils/fetch-cities";

const Account = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector(userSelector);
  const countries = useSelector(countriesSelector);
  const loading = useSelector(userLoadingSelector);

  const [cities, setCities] = useState<City[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string | number>(
    ""
  );
  const [formData, setFormData] = useState<Partial<UserDto> | undefined>();

  const handleGoBack = () => {
    navigate(-1);
  };

  const isFormValid = useMemo(() => {
    return Boolean(selectedCountryId);
  }, [selectedCountryId]);

  const update = async () => {
    if(!formData?.username || formData.username.trim() === ""){
      WebApp.showAlert("Telegram username is required for clients to contact you. Otherwise, your listing will remain in draft.")
      return
    }
    if (formData && user) {
      dispatch(updateUser(formData));
      WebApp.showAlert("Your data has been successfully updated", handleGoBack);
    }
  };

  useEffect(() => {
    if (!user) return;
    setSelectedCountryId(user.country.id);
    setFormData({
      user_id: user.user_id,
      username: user.username,
      city_id: user.city?.id,
      country_id: user.country.id,
    });
  }, [user]);

  useEffect(() => {
    (async () => {
      setCities(await fetchCities(selectedCountryId));
    })();
  }, [selectedCountryId]);

  return (
    <Stack gap={2}>
      <FontAwesomeIcon icon={faUser} size="7x" className="py-5 subtitleText" />
      <CountrySelect
        countries={countries}
        selectedCountryId={selectedCountryId}
        setSelectedCountryId={setSelectedCountryId}
        setFormData={setFormData}
      />
      <CitySelect
        cities={cities}
        selectedCountryId={selectedCountryId}
        setFormData={setFormData}
        formData={formData}
      />

      <InputGroup>
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        <Form.Control
          className="py-2"
          type="text"
          inputMode="text"
          placeholder="username"
          aria-label="username"
          maxLength={30}
          value={formData?.username || ""}
          onChange={(e) => {
            const inputValue = e.target.value.replace("@", "")            
            .replace(/[^a-zA-Z_]/g, "");

            setFormData((prev) => ({
              ...prev,
              username: inputValue,
            }));
          }}
        />
      </InputGroup>
      <Button
        className="main-button py-2"
        disabled={!isFormValid}
        onClick={() => {
          update();
        }}
      >
        {loading ? (
          <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          "Save"
        )}
      </Button>
    </Stack>
  );
};

export default Account;
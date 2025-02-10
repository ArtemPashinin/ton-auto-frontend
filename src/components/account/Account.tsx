import { faUser } from "@awesome.me/kit-7090d2ba88/icons/classic/light";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WebApp from "@twa-dev/sdk";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Stack, InputGroup, Spinner, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserDto } from "../../interfaces/dto/user.dto";
import { City } from "../../interfaces/user-info.interface";
import { countriesSelector } from "../../redux/slices/data-slice/data-slice";
import {
  userSelector,
  userLoadingSelector,
} from "../../redux/slices/user-slice/user-slice";
import { AppDispatch } from "../../redux/store";
import { fetchCities } from "../../utils/fetch-cities";
import { handleContactRequested } from "../../utils/handleContactRequested";
import CitySelect from "./CitySelect";
import CountrySelect from "./CountrySelect";
import { updateUser } from "../../redux/slices/user-slice/thunks/update-user";

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

  const handleGoBack = () => navigate(-1);

  const isFormValid = useMemo(() => {
    return Boolean(formData?.city_id && formData?.phone && selectedCountryId);
  }, [formData?.city_id, formData?.phone, selectedCountryId]);

  const shareNumber = useCallback(() => {
    WebApp.requestContact();
  }, []);

  const update = async () => {
    if (formData && user) {
      dispatch(updateUser(formData));
      WebApp.showAlert("Your data has been successfully updated", handleGoBack);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handle = (data: any) =>
      handleContactRequested(data, countries, selectedCountryId, setFormData);
    WebApp.onEvent("contactRequested", handle);

    return () => {
      WebApp.offEvent("contactRequested", handle);
    };
  }, [countries, selectedCountryId]);

  useEffect(() => {
    if (user) {
      setSelectedCountryId(user.city.country.id);
      setFormData({
        user_id: user.user_id,
        city_id: user.city.id,
        phone: user.phone,
      });
    }
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

      <div className="d-flex gap-2">
        <InputGroup>
          <InputGroup.Text id="basic-addon1">
            {countries?.length > 0 ? (
              countries.find((country) => country.id == selectedCountryId)
                ?.phone_code
            ) : (
              <Spinner animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </InputGroup.Text>

          <Form.Control
            className="py-2"
            placeholder="Phone number"
            aria-label="Phone number"
            aria-describedby="basic-addon1"
            value={formData?.phone}
            onChange={(e) => {
              const input = e.target.value;
              if (/^\d*$/.test(input)) {
                setFormData((prev) => ({ ...prev, phone: input }));
              }
            }}
            maxLength={14}
          />
        </InputGroup>
        <Button className="main-outline-button px-4" onClick={shareNumber}>
          Share
        </Button>
      </div>
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

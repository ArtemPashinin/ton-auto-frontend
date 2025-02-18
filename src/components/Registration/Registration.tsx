import { faMapLocationDot } from "@awesome.me/kit-7090d2ba88/icons/classic/thin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, InputGroup, Spinner, Stack } from "react-bootstrap";
import { countriesSelector } from "../../redux/slices/data-slice/data-slice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { UserDto } from "../../interfaces/dto/user.dto";
import { City } from "../../interfaces/user-info.interface";
import { fetchCities } from "../../utils/fetch-cities";
import CountrySelect from "../account/CountrySelect";
import CitySelect from "../account/CitySelect";
import WebApp from "@twa-dev/sdk";
import { handleContactRequested } from "../../utils/handleContactRequested";
import style from "./Registration.module.css";
import {
  userLoadingSelector,
  userSelector,
} from "../../redux/slices/user-slice/user-slice";
import { AppDispatch } from "../../redux/store";
import { createUser } from "../../redux/slices/user-slice/thunks/create-user";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Registretion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(userSelector);
  const loaing = useSelector(userLoadingSelector);
  const countries = useSelector(countriesSelector);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string | number>(
    ""
  );
  const [formData, setFormData] = useState<Partial<UserDto> | undefined>();

  const shareNumber = useCallback(() => {
    WebApp.requestContact();
  }, []);

  const isFormValid = useMemo(() => {
    return Boolean(formData?.city_id && formData?.phone && selectedCountryId);
  }, [formData?.city_id, formData?.phone, selectedCountryId]);

  const save = useCallback(async () => {
    if (!isFormValid) return;
    const { id, username, first_name, last_name, language_code } =
      WebApp.initDataUnsafe.user!;
    dispatch(
      createUser({
        user_id: id,
        username,
        first_name,
        last_name,
        language_code,
        phone: formData?.phone,
        city_id: formData?.city_id,
      })
    );
  }, [dispatch, formData?.city_id, formData?.phone, isFormValid]);

  useEffect(() => {
    if (user) {
      console.log(user);
      navigate("/"); // Перенаправляем на главную страницу
    }
  }, [navigate, user]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handle = (data: any) => handleContactRequested(data, setFormData);
    WebApp.onEvent("contactRequested", handle);

    return () => {
      WebApp.offEvent("contactRequested", handle);
    };
  }, [countries, selectedCountryId]);

  useEffect(() => {
    (async () => {
      setCities(await fetchCities(selectedCountryId));
    })();
  }, [selectedCountryId]);

  return (
    <Stack gap={2}>
      <FontAwesomeIcon
        icon={faMapLocationDot}
        className="my-5 subtitleText"
        size="6x"
      />
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
      <div className="mb-2">
        {formData?.phone ? (
          <InputGroup>
            <InputGroup.Text
              id="basic-addon1"
              className={`${style.telegramIconContainter}`}
            >
              <i className={`fa-brands fa-telegram ${style.telegramIcon}`}></i>
            </InputGroup.Text>
            <Form.Control
              disabled
              className="py-2"
              aria-label="Phone number"
              value={formData?.phone}
            />
          </InputGroup>
        ) : (
          <Button
            className="main-outline-button py-2 w-100"
            onClick={shareNumber}
          >
            Share my phone number
          </Button>
        )}
      </div>
      <p className={`text-start ${style.text} hintcolor`}>
        You can change settings later
      </p>
      <Button
        className="main-button py-2"
        disabled={!isFormValid}
        onClick={() => {
          save();
        }}
      >
        {loaing ? (
          <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          "Continue"
        )}
      </Button>
    </Stack>
  );
};

export default Registretion;

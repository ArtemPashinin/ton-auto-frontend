import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Form, Spinner, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validator from "validator";

import { faMapLocationDot } from "@awesome.me/kit-7090d2ba88/icons/classic/thin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WebApp from "@twa-dev/sdk";
import { UserDto } from "../../interfaces/dto/user.dto";
import { City } from "../../interfaces/user-info.interface";
import { countriesSelector } from "../../redux/slices/data-slice/data-slice";
import { createUser } from "../../redux/slices/user-slice/thunks/create-user";
import {
  userLoadingSelector,
  userSelector,
} from "../../redux/slices/user-slice/user-slice";
import { AppDispatch } from "../../redux/store";
import CitySelect from "../account/CitySelect";
import CountrySelect from "../account/CountrySelect";

import { fetchCities } from "../../utils/fetch-cities";
import { useAttention } from "../../hooks/useAttention";

import style from "./Registration.module.css";

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

  const isFormValid = useMemo(() => {
    return Boolean(
      formData?.city_id &&
        validator.isMobilePhone(formData.phone || "") &&
        selectedCountryId
    );
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
      navigate("/"); // Перенаправляем на главную страницу
    }
  }, [navigate, user]);

  useEffect(() => {
    (async () => {
      setCities(await fetchCities(selectedCountryId));
    })();
  }, [selectedCountryId]);

  useAttention();

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
        <Form.Control
          className="py-2"
          type="text"
          inputMode="decimal"
          placeholder="Phone"
          aria-label="Phone"
          maxLength={15}
          value={formData?.phone || ""}
          onChange={(e) => {
            const inputValue = e.target.value;

            if (/^\+?\d*$/.test(inputValue)) {
              setFormData((prev) => ({
                ...prev,
                phone: inputValue.startsWith("+")
                  ? inputValue
                  : `+${inputValue}`,
              }));
            }
          }}
        />
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

import { Button, Form, InputGroup, SplitButton, Stack } from "react-bootstrap";
import style from "./Location.module.css";
import { useCallback, useEffect, useState } from "react";
import { Country } from "../../interfaces/country.interface";
import axios from "axios";
import { City } from "../../interfaces/city.interface";
import WebApp from "@twa-dev/sdk";
import { UserDto } from "../../interfaces/dto/user.dto";

interface LocationProps {
  setUserRegistred: (registered: boolean) => void;
}

export const Location = ({ setUserRegistred }: LocationProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("+1");
  const [selectedCountryId, setSelectedCountryId] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  useEffect(() => {
    const handleContactRequested = (data: any) => {
      const contactNumber = data.responseUnsafe?.contact?.phone_number;
      if (contactNumber) {
        setPhoneNumber(contactNumber.substring(phoneCode.length));
      }
    };

    WebApp.onEvent("contactRequested", handleContactRequested);

    return () => {
      WebApp.offEvent("contactRequested", handleContactRequested);
    };
  }, [phoneCode.length]);

  const userRegister = useCallback(async () => {
    if (!selectedCity || !selectedCountryId || !phoneNumber) return;

    try {
      const { id, username, first_name, last_name, language_code } =
        WebApp.initDataUnsafe.user!;

      const user: UserDto = {
        user_id: id,
        username,
        first_name,
        last_name,
        city_id: selectedCity,
        language_code,
        phone: phoneNumber,
      };

      const { data } = await axios.post<boolean>(
        `${process.env.REACT_APP_API_URL}/user`,
        user
      );

      if (data) setUserRegistred(true);
    } catch (err) {
      console.error("Error during user registration:", err);
    }
  }, [phoneNumber, selectedCity, selectedCountryId, setUserRegistred]);

  const shareNumber = useCallback(() => {
    WebApp.requestContact();
  }, []);

  const fetchCountries = useCallback(async () => {
    try {
      const { data } = await axios.get<Country[]>(
        `${process.env.REACT_APP_API_URL}/user/countries`
      );
      setCountries(data);
    } catch (err) {
      console.error("Error fetching countries:", err);
    }
  }, []);

  const fetchCities = useCallback(async () => {
    if (!selectedCountryId) return;

    try {
      const { data } = await axios.get<City[]>(
        `${process.env.REACT_APP_API_URL}/user/cities/${selectedCountryId}`
      );
      setCities(data);
    } catch (err) {
      console.error("Error fetching cities:", err);
    }
  }, [selectedCountryId]);

  const handleCountryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const countryId = event.target.value;
    const selectedCountry = countries.find(
      (country) => country.id === parseInt(countryId)
    );

    setSelectedCountryId(countryId);
    setPhoneCode(selectedCountry?.phone_code || "+1");
  };

  const handleCityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedCity(event.target.value);
  };

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  return (
    <Stack className="p-3" gap={2}>
      <i
        className={`fa-solid fa-map-location-dot ${style.mapIcon} text-center pt-4 pb-5`}
      ></i>

      <Form.Select
        aria-label="Select your country"
        value={selectedCountryId}
        onChange={handleCountryChange}
      >
        <option value="">Select your country</option>
        {countries.map(({ id, title }) => (
          <option key={id} value={id}>
            {title}
          </option>
        ))}
      </Form.Select>

      <Form.Select
        aria-label="Select cities"
        onChange={handleCityChange}
        value={selectedCity}
        disabled={!selectedCountryId}
      >
        <option value="">All cities</option>
        {cities.map(({ id, title }) => (
          <option key={id} value={id}>
            {title}
          </option>
        ))}
      </Form.Select>

      <InputGroup>
        <InputGroup.Text id="basic-addon1">{phoneCode}</InputGroup.Text>
        <Form.Control
          placeholder="Phone number"
          aria-label="Phone number"
          aria-describedby="basic-addon1"
          value={phoneNumber}
          onChange={(e) => {
            const input = e.target.value;
            if (/^\d*$/.test(input)) {
              setPhoneNumber(input);
            }
          }}
          maxLength={14}
        />

        <Button onClick={shareNumber}>Share</Button>
      </InputGroup>

      <p className={`text-start ${style.text}`}>
        You can change settings later
      </p>
      <Button
        onClick={userRegister}
        disabled={!(selectedCity && selectedCountryId && phoneNumber)}
      >
        Continue
      </Button>
    </Stack>
  );
};

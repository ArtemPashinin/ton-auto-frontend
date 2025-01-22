import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Form, InputGroup, Spinner, Stack } from "react-bootstrap";
import { City, Country, User } from "../../interfaces/vehicle-info.interface";
import { fetchVehicleData } from "../../utils/fetch-vehicle-data";
import { fetchUser } from "../../utils/fetch-user";
import { fetchCities } from "../../utils/fetch-cities";
import { UserDto } from "../../interfaces/dto/user.dto";
import WebApp from "@twa-dev/sdk";
import { updateUser } from "../../utils/update-user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@awesome.me/kit-7090d2ba88/icons/classic/regular";

export const Account = () => {
  const [user, setUser] = useState<User | undefined>();
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string | number>(
    ""
  );
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [formData, setFormData] = useState<Partial<UserDto> | undefined>();

  const isFormValid = useMemo(
    () => formData?.city_id && formData.phone && selectedCountryId,
    [formData?.city_id, formData?.phone, selectedCountryId]
  );

  const update = useCallback(async () => {
    if (formData && user) {
      await updateUser(formData, user.id!);
      WebApp.showAlert("Your data has been successfully updated");
    }
  }, [formData, user]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleContactRequested = (data: any) => {
      const contactNumber = data.responseUnsafe?.contact?.phone_number;
      if (contactNumber) {
        setFormData((prev) => ({
          ...prev,
          phone: contactNumber.substring(user?.city.country.phone_code.length),
        }));
      }
    };

    WebApp.onEvent("contactRequested", handleContactRequested);

    return () => {
      WebApp.offEvent("contactRequested", handleContactRequested);
    };
  }, [user?.city.country.phone_code]);

  const shareNumber = useCallback(() => {
    WebApp.requestContact();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchUser();
      setUser(user);
      const countriesData = await fetchVehicleData("countries");
      setCountries(countriesData);
      setSelectedCountryId(user.city.country.id);
      setFormData({
        user_id: user.user_id,
        city_id: user.city.id,
        phone: user.phone,
      });
      setIsLoadingCountries(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    (async () => {
      setCities(await fetchCities(selectedCountryId));
    })();
  }, [selectedCountryId]);

  return (
    <Stack className="p-2" gap={2}>
      <FontAwesomeIcon icon={faUser} size="7x" className="py-5 subtitleText" />
      <Form.Select
        aria-label="Select your country"
        value={selectedCountryId}
        onChange={(event) => {
          setSelectedCountryId(event.target.value);
          setFormData((prev) => ({ ...prev, city_id: "" }));
        }}
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
        value={formData?.city_id}
        disabled={!selectedCountryId}
        onChange={(event) => {
          setFormData((prev) => ({ ...prev, city_id: event.target.value }));
        }}
      >
        <option value="">All cities</option>
        {cities.map(({ id, title }) => (
          <option key={id} value={id}>
            {title}
          </option>
        ))}
      </Form.Select>

      <InputGroup>
        <InputGroup.Text id="basic-addon1">
          {isLoadingCountries ? (
            <Spinner animation="border" role="status" size="sm">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            countries.find((country) => country.id == selectedCountryId)
              ?.phone_code
          )}
        </InputGroup.Text>

        <Form.Control
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

        <Button className="fade-outline-button" onClick={shareNumber}>
          Share
        </Button>
      </InputGroup>

      <Button
        className="main-button"
        disabled={!isFormValid}
        onClick={() => {
          update();
        }}
      >
        Save
      </Button>
    </Stack>
  );
};

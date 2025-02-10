import { Form } from "react-bootstrap";
import { UserDto } from "../../interfaces/dto/user.dto";
import { Country } from "../../interfaces/user-info.interface";

interface CountrySelectProps {
  countries: Country[];
  selectedCountryId: string | number;
  setSelectedCountryId: React.Dispatch<React.SetStateAction<string | number>>;
  setFormData: React.Dispatch<
    React.SetStateAction<Partial<UserDto> | undefined>
  >;
}

const CountrySelect = ({
  countries,
  selectedCountryId,
  setSelectedCountryId,
  setFormData,
}: CountrySelectProps) => {
  return (
    <Form.Select
      className="py-2"
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
  );
};

export default CountrySelect;

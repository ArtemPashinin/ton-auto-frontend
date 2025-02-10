import { Form } from "react-bootstrap";
import { City } from "../../interfaces/user-info.interface";
import { UserDto } from "../../interfaces/dto/user.dto";

interface CitySelectProps {
  cities: City[];
  selectedCountryId: string | number;
  formData: Partial<UserDto> | undefined;
  setFormData: React.Dispatch<
    React.SetStateAction<Partial<UserDto> | undefined>
  >;
}

const CitySelect = ({
  cities,
  selectedCountryId,
  setFormData,
  formData,
}: CitySelectProps) => {
  return (
    <Form.Select
      className="py-2"
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
  );
};

export default CitySelect;

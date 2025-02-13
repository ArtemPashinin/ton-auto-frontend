import { Form } from "react-bootstrap";
import { City } from "../../interfaces/user-info.interface";
import { UserDto } from "../../interfaces/dto/user.dto";

interface CitySelectProps {
  cities: City[];
  selectedCountryId: string | number;
  value?: string | number;
  onChange?: (value: string | number) => void;
  formData?: Partial<UserDto>;
  setFormData?: React.Dispatch<
    React.SetStateAction<Partial<UserDto> | undefined>
  >;
}

const CitySelect = ({
  cities,
  selectedCountryId,
  value,
  onChange,
  setFormData,
  formData,
}: CitySelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (onChange) {
      onChange(selectedValue);
    } else if (setFormData) {
      setFormData((prev) => ({ ...prev, city_id: selectedValue }));
    }
  };

  return (
    <Form.Select
      className="py-2"
      aria-label="Select cities"
      value={value ?? formData?.city_id ?? ""}
      disabled={!selectedCountryId}
      onChange={handleChange}
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

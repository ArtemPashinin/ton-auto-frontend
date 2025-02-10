import { UserDto } from "../interfaces/dto/user.dto";
import { Country } from "../interfaces/user-info.interface";

export const handleContactRequested = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  countries: Country[],
  selectedCountryId: string | number,
  setFormData: React.Dispatch<
    React.SetStateAction<Partial<UserDto> | undefined>
  >
) => {
  const contactNumber = data.responseUnsafe?.contact?.phone_number as string;
  const selectedCountry = countries.find(
    (country) => country.id == selectedCountryId
  );

  let reducer = 0;
  if (selectedCountry?.phone_code) {
    reducer = selectedCountry.phone_code.length;
  }

  if (!contactNumber?.includes("+")) {
    reducer -= 1;
  }

  if (contactNumber) {
    setFormData((prev) => ({
      ...prev,
      phone: contactNumber.substring(reducer),
    }));
  }
};

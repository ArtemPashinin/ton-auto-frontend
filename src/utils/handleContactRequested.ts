import { UserDto } from "../interfaces/dto/user.dto";

export const handleContactRequested = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  setFormData: React.Dispatch<
    React.SetStateAction<Partial<UserDto>  | undefined>
  >
) => {
  const contactNumber = data.responseUnsafe?.contact?.phone_number as string;
  if (contactNumber) {
    setFormData((prev) => ({
      ...prev,
      phone: contactNumber,
    }));
  }
};

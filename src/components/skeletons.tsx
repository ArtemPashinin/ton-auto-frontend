import { Placeholder, Stack } from "react-bootstrap";
import SelectPlaceholder from "./placeholders/SelectPlaceholder";

export const AccountSkeleton = () => {
  return (
    <Stack gap={2}>
      <SelectPlaceholder size={12} />
      <SelectPlaceholder size={12} />

      <Placeholder
        as="div"
        animation="glow"
        className="w-100 d-flex gap-2 justify-content-between"
      >
        <Placeholder xs={8} bg="light" />
        <Placeholder xs={3} bg="light" />
      </Placeholder>
      <SelectPlaceholder size={12} />
    </Stack>
  );
};

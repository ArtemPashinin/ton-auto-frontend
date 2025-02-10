import { Button } from "react-bootstrap";

interface CallButtonProps {
  phoneNumber: string;
}

export const CallButton = ({ phoneNumber }: CallButtonProps) => {
  const call = () => window.open(`tel:${phoneNumber}`);

  return (
    <Button className="w-100 main-button py-2" onClick={call}>
      Call
    </Button>
  );
};

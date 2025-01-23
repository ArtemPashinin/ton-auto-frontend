import { Col } from "react-bootstrap";
import style from "./VehicleTypebutton.module.css";

interface VehicleTypeButtonProps {
  title: string;
  isACtive: boolean;
  onClick: () => void;
}

export const VehicleTypeButton = ({
  title,
  isACtive,
  onClick,
}: VehicleTypeButtonProps) => {
  return (
    <Col
      onClick={onClick}
      className={`${style.vehicleTypeButton} fs-12 ${
        isACtive ? style.enabled : style.disabled
      } border rounded-pill user-select-none p-2 py-2`}
    >
      <p>{title}</p>
    </Col>
  );
};

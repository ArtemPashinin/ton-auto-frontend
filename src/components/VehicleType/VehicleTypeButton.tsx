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
      onClick={() => {
        onClick();
      }}
      className={`${style.vehicleTypeButton} p-0 fs-087 ${
        isACtive ? style.enabled : style.disabled
      } border rounded-pill user-select-none py-1`}
    >
      <p>{title}</p>
    </Col>
  );
};

import { Col } from "react-bootstrap";
import style from "./MenuButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";

interface MenuButtonProps {
  icon: IconProp;
  title: string;
  color?: string;
  size: SizeProp;
  isActive: boolean;
  margin?: string;
  onClick: () => void;
}

export const MenuButton = ({
  icon,
  title,
  color,
  size,
  margin,
  isActive,
  onClick,
}: MenuButtonProps) => {
  return (
    <Col
      onClick={onClick}
      className={`defaultText ${
        isActive ? style.pressed : ""
      } user-select-none pb-1 pt-2 rounded-3 px-0 d-flex flex-column justify-content-end`}
    >
      <FontAwesomeIcon icon={icon} size={size} color={color} />
      <p className={`mt-1 ${style.buttonTitle} ${margin}`}>{title}</p>
    </Col>
  );
};

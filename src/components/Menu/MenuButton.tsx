import { Col } from "react-bootstrap";
import style from "./MenuButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface MenuButtonProps {
  icon: IconProp;
  title: string;
  color?: string;
  isActive: boolean;
  onClick: () => void;
}

export const MenuButton = ({
  icon,
  title,
  color,
  isActive,
  onClick,
}: MenuButtonProps) => {
  return (
    <Col
      onClick={onClick}
      className={`defaultText ${
        isActive ? style.pressed : ""
      } user-select-none pb-1 pt-3 rounded-3 px-0`}
    >
      <FontAwesomeIcon icon={icon} size="xl" color={color} />
      <p className={`mt-2 ${style.buttonTitle}`}>{title}</p>
    </Col>
  );
};

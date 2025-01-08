import { Col } from "react-bootstrap";
import style from "./MenuButton.module.css";

interface MenuButtonProps {
  icon: string;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

export const MenuButton = ({
  icon,
  title,
  isActive,
  onClick,
}: MenuButtonProps) => {
  return (
    <Col
      onClick={onClick}
      className={`${
        isActive ? style.pressed : ""
      } user-select-none pb-1 pt-3 rounded-3 px-0`}
    >
      <i className={`${icon} ${style.icon} mb-2`}></i>
      <p className={style.buttonTitle}>{title}</p>
    </Col>
  );
};

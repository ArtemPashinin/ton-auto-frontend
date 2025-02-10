import { Placeholder } from "react-bootstrap";
import style from "./SelectPlaceholder.module.css";


interface SelectPlaceholderProps {
  size: number;
}

const SelectPlaceholder = ({ size }: SelectPlaceholderProps) => {
  return (
    <Placeholder as="div" animation="glow" className={`${style.placeholder}`}>
      <Placeholder xs={size} bg="light" className={`${style.placeholder}`} />
    </Placeholder>
  );
};

export default SelectPlaceholder;

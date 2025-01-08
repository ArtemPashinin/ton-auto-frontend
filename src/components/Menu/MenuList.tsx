import { Container, Row } from "react-bootstrap";
import style from "./MenuButton.module.css";
import { MenuButton } from "./MenuButton";
import { menuButtonData } from "../../enums/MenuButtonData.enum";
import { useMenuContext } from "./MenuContext";

export const MenuList = () => {
  const { tab: activeTab, setTabState } = useMenuContext();

  return (
    <Container className={`sticky-bottom ${style.searchMenu}`}>
      <Row>
        {menuButtonData.map(({ icon, title, tab }, index) => (
          <MenuButton
            key={index}
            icon={icon}
            title={title}
            isActive={tab === activeTab}
            onClick={() => setTabState(tab)}
          />
        ))}
      </Row>
    </Container>
  );
};

import { Container, Row } from "react-bootstrap";
import style from "./MenuButton.module.css";
import { MenuButton } from "./MenuButton";

import { useMenuContext } from "./MenuContext";
import { menuButtonData } from "../../enums/MenuButtonData.enum";

export const MenuList = () => {
  const { tab: activeTab, setTabState } = useMenuContext();

  return (
    <Container className={`fixed-bottom ${style.searchMenu} pb-4`}>
      <Row>
        {menuButtonData.map(({ icon, title, tab, color }, index) => (
          <MenuButton
            color={color}
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

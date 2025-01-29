import { Container, Row } from "react-bootstrap";
import style from "./MenuButton.module.css";
import { MenuButton } from "./MenuButton";

import { useMenuContext } from "./MenuContext";
import { menuButtonData } from "../../enums/MenuButtonData.enum";

export const MenuList = () => {
  const { tab: activeTab, setTabState } = useMenuContext();

  return (
    <Container className={`fixed-bottom ${style.searchMenu} pb-4 px-3 pt-2`}>
      <Row>
        {menuButtonData.map((data, index) => (
          <MenuButton
            {...data}
            key={index}
            isActive={data.tab === activeTab}
            onClick={() => setTabState(data.tab)}
          />
        ))}
      </Row>
    </Container>
  );
};

import { Container, Row } from "react-bootstrap";
import { appRoutesData } from "../../enums/app-routes";
import TabBarButton from "../buttons/TabBarButton/TabBarButton";
import style from './TabBar.module.css'

const TabBar = () => {
  return (
    <Container className={`fixed-bottom pb-4 px-3 pt-2 ${style.searchMenu}`}>
      <Row>
        {appRoutesData.map((appRouteData, index) => (
          <TabBarButton key={index} {...appRouteData} />
        ))}
      </Row>
    </Container>
  );
};

export default TabBar;

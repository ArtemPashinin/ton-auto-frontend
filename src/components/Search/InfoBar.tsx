import { Col, Container, Row } from "react-bootstrap";
import { useSearchContext } from "./SearchContext";

export const InfoBar = () => {
  const { setUpAdvertisements, advertisementsCount } = useSearchContext();

  return (
    <Container className="my-3">
      <Row>
        <Col className="text-start p-0 mainText fs-14"></Col>
        <Col className="p-0">
          <p className="subtitleText fs-14">{advertisementsCount} results</p>
        </Col>
        <Col className="text-end p-0">
          <p
            className="defaultText fs-14 "
            onClick={() => {
              setUpAdvertisements();
            }}
          >
            <a
              href="#"
              className="link-underline-primary link-underline-opacity-0 mainText"
            >
              Reset
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

import { Col, Container, Row } from "react-bootstrap";
import { useSearchContext } from "./SearchContext";
import { useEffect, useState } from "react";

export const InfoBar = () => {
  const { setUpAdvertisements, advertisementsCount, currentQuery, searchData } =
    useSearchContext();
  const [countryTitle, setCountrytitle] = useState<string | undefined>();
  const [cityTitle, setCitytitle] = useState<string | undefined>();

  useEffect(() => {
    setCountrytitle(
      searchData.countries.find((country) => country.id == currentQuery.country)
        ?.title
    );
  }, [currentQuery.country, searchData.countries]);

  useEffect(() => {
    setCitytitle(
      searchData.cities.find((city) => city.id == currentQuery.city)?.title
    );
  }, [currentQuery.city, searchData.cities]);

  return (
    <Container className="my-3">
      <Row>
        <Col className="text-start p-0 subtitleText fs-14">
          <p>
            {countryTitle}
            {cityTitle ? `, ${cityTitle}` : ""}
          </p>
        </Col>
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

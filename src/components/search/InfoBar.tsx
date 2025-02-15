import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  advertisementCountSelector,
  advertisementLoadingSelector,
} from "../../redux/slices/advertisement-slice/advertisement-slice";
import { AppDispatch } from "../../redux/store";
import {
  resetFilters,
  searchFiltersSelector,
  setFilter,
} from "../../redux/slices/search-filters-slice/search-filters-slice";
import { countriesSelector } from "../../redux/slices/data-slice/data-slice";
import { fetchCities } from "../../utils/fetch-cities";
import { clearPage } from "../../redux/slices/page-slice/page-slice";
import { userSelector } from "../../redux/slices/user-slice/user-slice";

interface InfoBarProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InfoBar = ({ setOpen }: InfoBarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelector(advertisementCountSelector);
  const loading = useSelector(advertisementLoadingSelector);
  const user = useSelector(userSelector);

  const countries = useSelector(countriesSelector);
  const { country: countryId, city: cityId } = useSelector(
    searchFiltersSelector
  );

  const [countryTitle, setCountrytitle] = useState<string | undefined>();
  const [cityTitle, setCityTitle] = useState<string | undefined>();

  useEffect(() => {
    setCountrytitle(
      countries.find((country) => country.id == countryId)?.title
    );
  }, [countries, countryId]);

  useEffect(() => {
    (async () => {
      const cities = await fetchCities(countryId);
      setCityTitle(cities.find((city) => city.id == cityId)?.title);
    })();
  }, [cityId, countryId]);

  return (
    <Container className="my-3">
      <Row className="text-center">
        <Col className="text-start p-0 subtitleText fs-14">
          <a
            href="#"
            className="link-underline-primary link-underline-opacity-0 mainText"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            {countryTitle}
            {cityTitle ? `, ${cityTitle}` : ""}
          </a>
        </Col>
        <Col className="p-0">
          <div className="subtitleText fs-14 d-flex align-items-center justify-content-center">
            {loading ? (
              <Spinner
                animation="border"
                role="status"
                size="sm"
                className="me-2"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              `${count} `
            )}
            results
          </div>
        </Col>
        <Col className="text-end p-0">
          <p
            className="defaultText fs-14 "
            onClick={() => {
              dispatch(resetFilters());
              if (user)
                dispatch(
                  setFilter({ key: "country", value: user.city.country.id })
                );
              dispatch(clearPage({ pageType: "searchPage" }));
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

export default InfoBar;

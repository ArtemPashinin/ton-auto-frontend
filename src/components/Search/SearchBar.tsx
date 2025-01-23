import { Button, Collapse, Container, Form, Stack } from "react-bootstrap";
import { useSearchContext } from "./SearchContext";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@awesome.me/kit-7090d2ba88/icons/classic/light";

export const SearchBar = () => {
  const { searchData, virtualQuery, updateQuery, searchAdvertisements } =
    useSearchContext();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container className="p-0 d-flex gap-1">
        <Form.Select
          value={virtualQuery.make || ""}
          onChange={(e) => {
            updateQuery("make", e.target.value);
            updateQuery("model", undefined);
          }}
          aria-label="Select make"
        >
          <option value="">Make</option>
          {searchData.makes.map((make) => (
            <option key={make.id} value={make.id}>
              {make.make}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          value={virtualQuery.model || ""}
          onChange={(e) => {
            updateQuery("model", e.target.value);
          }}
          disabled={!virtualQuery.make}
          aria-label="Select model"
        >
          <option value="">Model</option>
          {searchData.models.map(({ id, model }) => (
            <option key={id} value={id}>
              {model}
            </option>
          ))}
        </Form.Select>
        <Button
          className="outline-button lh-14 py-2"
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          <FontAwesomeIcon icon={faSliders} />
        </Button>
        <Button
          className="outline-button py-2"
          onClick={() => {
            searchAdvertisements();
          }}
        >
          Search
        </Button>
      </Container>
      <Collapse in={open}>
        <Stack gap={2}>
          <div className="d-flex gap-1 pt-3">
            <Form.Select
              value={virtualQuery.yearFrom || ""}
              onChange={(e) => {
                updateQuery("yearFrom", e.target.value);
              }}
              aria-label="Year from"
            >
              <option value="">Year from</option>
              {searchData.years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              value={virtualQuery.yearTo || ""}
              onChange={(e) => {
                updateQuery("yearTo", e.target.value);
              }}
              aria-label="Year to"
            >
              <option value="">Year to</option>
              {searchData.years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="d-flex gap-1">
            <Form.Select
              value={virtualQuery.country || ""}
              onChange={(e) => {
                updateQuery("country", e.target.value);
                updateQuery("city", undefined);
              }}
              aria-label="Country"
            >
              <option value="">Country</option>
              {searchData.countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.title}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              value={virtualQuery.city || ""}
              onChange={(e) => {
                updateQuery("city", e.target.value);
              }}
              disabled={!virtualQuery.country}
              aria-label="City"
            >
              <option value="">City</option>
              {searchData.cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.title}
                </option>
              ))}
            </Form.Select>
          </div>
          <div>
            <Form.Select
              value={virtualQuery.engine || ""}
              onChange={(e) => {
                updateQuery("engine", e.target.value);
              }}
              aria-label="Engine type"
            >
              <option value="">Engine type</option>
              {searchData.engineTypes.map((engineType) => (
                <option key={engineType.id} value={engineType.id}>
                  {engineType.type}
                </option>
              ))}
            </Form.Select>
          </div>
          <div>
            <p className="defaultText fs-17 text-start">Mileage range</p>
          </div>
          <div className="d-flex gap-1">
            <Form.Select
              value={virtualQuery.mileageFrom || ""}
              aria-label="0"
              onChange={(e) => {
                updateQuery("mileageFrom", e.target.value);
              }}
            >
              <option value="">Mileage from</option>
              {searchData.mileage.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Form.Select>

            <Form.Select
              value={virtualQuery.mileageTo || ""}
              onChange={(e) => {
                updateQuery("mileageTo", e.target.value);
              }}
            >
              <option value="">Mileage to</option>
              {searchData.mileage
                .slice()
                .reverse()
                .map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
            </Form.Select>
          </div>

          <div className="pb-3">
            <Button
              className="w-100 main-button  py-2"
              onClick={() => {
                searchAdvertisements();
              }}
            >
              Search
            </Button>
          </div>
        </Stack>
      </Collapse>
    </>
  );
};

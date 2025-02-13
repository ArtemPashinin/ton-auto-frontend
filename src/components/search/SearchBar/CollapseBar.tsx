import { Button, Collapse, Form, Stack } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import { QueryDto } from "../../../interfaces/dto/query.dto";
import { generateYearsList } from "../../../utils/generate-years-list";
import { City } from "../../../interfaces/user-info.interface";
import { fetchCities } from "../../../utils/fetch-cities";
import { useSelector } from "react-redux";
import {
  countriesSelector,
  engineTypesSelector,
} from "../../../redux/slices/data-slice/data-slice";
import { generateMileageList } from "../../../utils/generate-milegale-list";

interface CollapseBarProps {
  open: boolean;
  filters: QueryDto;
  handleChangeFilter: (
    key: keyof QueryDto,
    value: QueryDto[keyof QueryDto]
  ) => void;
  searchAdvertisements: () => void;
}

const CollapseBar = ({
  open,
  filters,
  handleChangeFilter,
  searchAdvertisements,
}: CollapseBarProps) => {
  const countries = useSelector(countriesSelector);
  const engineTypes = useSelector(engineTypesSelector);
  const years = useMemo(generateYearsList, []);
  const mileage = useMemo(generateMileageList, []);

  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    (async () => {
      setCities(await fetchCities(filters.country));
    })();
  }, [filters.country]);

  return (
    <Collapse in={open}>
      <Stack gap={2}>
        <div className="d-flex gap-1 pt-3">
          <Form.Select
            className="py-2"
            value={filters.country || ""}
            onChange={(e) => {
              handleChangeFilter("country", e.target.value);
              handleChangeFilter("city", undefined);
            }}
            aria-label="Country"
          >
            <option value="">Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.title}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            className="py-2"
            value={filters.city || ""}
            onChange={(e) => {
              handleChangeFilter("city", e.target.value);
            }}
            disabled={!filters.country}
            aria-label="City"
          >
            <option value="">City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.title}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="d-flex gap-1">
          <Form.Select
            className="py-2"
            value={filters.yearFrom || ""}
            onChange={(e) => {
              handleChangeFilter("yearFrom", e.target.value);
            }}
            aria-label="Year from"
          >
            <option value="">Year from</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            className="py-2"
            value={filters.yearTo || ""}
            onChange={(e) => {
              handleChangeFilter("yearTo", e.target.value);
            }}
            aria-label="Year to"
          >
            <option value="">Year to</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Form.Select>
        </div>

        <div>
          <Form.Select
            className="py-2"
            value={filters.engine || ""}
            onChange={(e) => {
              handleChangeFilter("engine", e.target.value);
            }}
            aria-label="Engine type"
          >
            <option value="">Engine type</option>
            {engineTypes.map((engineType) => (
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
            className="py-2"
            value={filters.mileageFrom || ""}
            aria-label="0"
            onChange={(e) => {
              handleChangeFilter("mileageFrom", e.target.value);
            }}
          >
            <option value="">Mileage from</option>
            {mileage.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Form.Select>

          <Form.Select
            className="py-2"
            value={filters.mileageTo || ""}
            onChange={(e) => {
              handleChangeFilter("mileageTo", e.target.value);
            }}
          >
            <option value="">Mileage to</option>
            {mileage
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
            onClick={searchAdvertisements}
          >
            Search
          </Button>
        </div>
      </Stack>
    </Collapse>
  );
};

export default CollapseBar;

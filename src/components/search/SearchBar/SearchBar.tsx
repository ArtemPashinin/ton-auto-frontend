import { Button, Container, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@awesome.me/kit-7090d2ba88/icons/classic/light";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import {
  searchFiltersSelector,
  setFilter,
} from "../../../redux/slices/search-filters-slice/search-filters-slice";
import { existsMakesSelector } from "../../../redux/slices/data-slice/data-slice";
import { QueryDto } from "../../../interfaces/dto/query.dto";
import { useCallback, useEffect, useState } from "react";
import { Model } from "../../../interfaces/vehicle-info.interface";
import CollapseBar from "./CollapseBar";
import { fetchAdvertisements } from "../../../redux/slices/advertisement-slice/thunks/fetch-advertisement";
import { clearAdvertisements } from "../../../redux/slices/advertisement-slice/advertisement-slice";
import throttle from "lodash.throttle";
import { fetchExistsModels } from "../../../utils/fetch-exists-models";

interface SearchBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar = ({ open, setOpen }: SearchBarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector(searchFiltersSelector);
  const makes = useSelector(existsMakesSelector);

  const [models, setModels] = useState<Model[]>([]);

  const throttledOpen = throttle(() => {
    setOpen((prev) => !prev);
  }, 5000);

  const handleChangeFilter = (
    key: keyof QueryDto,
    value: QueryDto[keyof QueryDto]
  ) => {
    dispatch(setFilter({ key, value }));
  };

  const searchAdvertisements = useCallback(() => {
    dispatch(clearAdvertisements());
    dispatch(fetchAdvertisements(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    (async () => {
      setModels(await fetchExistsModels(filters.make));
    })();
  }, [filters.make]);

  return (
    <>
      <Container className="p-0 d-flex gap-1">
        <Form.Select
          className="py-2"
          value={filters.make || ""}
          onChange={(e) => {
            handleChangeFilter("make", e.target.value);
            handleChangeFilter("model", undefined);
          }}
          aria-label="Select make"
        >
          <option value="">Make</option>
          {makes.map((make) => (
            <option key={make.id} value={make.id}>
              {make.make}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          className="py-2"
          value={filters.model || ""}
          onChange={(e) => {
            handleChangeFilter("model", e.target.value);
          }}
          disabled={!filters.make}
          aria-label="Select model"
        >
          <option value="">Model</option>
          {models.map(({ id, model }) => (
            <option key={id} value={id}>
              {model}
            </option>
          ))}
        </Form.Select>
        <Button
          className="outline-button lh-14 py-2"
          onClick={throttledOpen}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          <FontAwesomeIcon icon={faSliders} />
        </Button>
        <Button className="outline-button py-2" onClick={searchAdvertisements}>
          Search
        </Button>
      </Container>
      <CollapseBar
        open={open}
        filters={filters}
        handleChangeFilter={handleChangeFilter}
        searchAdvertisements={searchAdvertisements}
      />
    </>
  );
};

export default SearchBar;

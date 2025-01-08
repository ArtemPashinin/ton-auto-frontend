import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSearchContext } from "./SearchContext";

export const SearchBar = () => {
  const { searchData, virtualQuery, updateQuery } = useSearchContext();
  return (
    <Container>
      <Row>
        <Col xs={4} className="p-0">
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
        </Col>
        <Col xs={4} className="p-0">
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
        </Col>
        <Col xs={1} className="p-0">
          <Button>
            <i className="fa-solid fa-sliders"></i>
          </Button>
        </Col>
        <Col xs={3} className="p-0">
          <Button>Search</Button>
        </Col>
      </Row>
    </Container>
  );
};

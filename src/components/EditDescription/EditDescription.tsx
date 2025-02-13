import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { descriptionSelector } from "../../redux/slices/description-slice/description-slice";
import { AppDispatch } from "../../redux/store";

const EditDescription = () => {
    const dispatch = useDispatch<AppDispatch>();
    const description = useSelector(descriptionSelector)
  return (
    <Form>
      <Container>
        <Row className="mb-2 gap-2">
          <Form.Group as={Col} className="p-0" id="place-form">
            <Form.Select
              className="py-2"
              as={Col}
              isInvalid={!selectedMakeId && isSubmitted}
              value={selectedMakeId || ""}
              onChange={(e) => {
                setSelectedMakeId(e.target.value);
                dispatch(setField({ key: "model_id", value: undefined }));
              }}
              aria-label="Select make"
            >
              <option value="">Make</option>
              {makes.map(({ id, make }) => (
                <option key={id} value={id}>
                  {make}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} className="p-0">
            <Form.Select
              className="py-2"
              isInvalid={!placeData.model_id && isSubmitted}
              value={placeData.model_id || ""}
              onChange={(e) => {
                dispatch(setField({ key: "model_id", value: e.target.value }));
              }}
              disabled={!selectedMakeId}
              aria-label="Select model"
            >
              <option value="">Model</option>
              {models.map(({ id, model }) => (
                <option key={id} value={id}>
                  {model}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-2 gap-2">
          <Form.Group as={Col} className="p-0">
            <Form.Select
              className="py-2"
              isInvalid={!placeData.engine_id && isSubmitted}
              value={placeData.engine_id || ""}
              onChange={(e) => {
                dispatch(setField({ key: "engine_id", value: e.target.value }));
              }}
              aria-label="Select engine type"
            >
              <option value="">Engine type</option>
              {engineTypes.map(({ id, type }) => (
                <option key={id} value={id}>
                  {type}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} className="p-0">
            <Form.Select
              className="py-2"
              isInvalid={!placeData.color_id && isSubmitted}
              value={placeData.color_id || ""}
              onChange={(e) => {
                dispatch(setField({ key: "color_id", value: e.target.value }));
              }}
              aria-label="Select color"
            >
              <option value="">Color</option>
              {colors.map(({ id, color }) => (
                <option key={id} value={id}>
                  {color}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-2 gap-2">
          <Form.Group as={Col} className="p-0">
            <Form.Select
              className="py-2"
              isInvalid={!placeData.year && isSubmitted}
              value={placeData.year || ""}
              onChange={(e) => {
                dispatch(setField({ key: "year", value: e.target.value }));
              }}
              aria-label="Select year"
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} className="p-0">
            <Form.Control
              className="py-2"
              isInvalid={!placeData.hp && isSubmitted}
              type="text"
              inputMode="numeric"
              placeholder="Horse powers"
              aria-label="Horse powers"
              maxLength={4}
              value={placeData.hp || ""}
              onChange={(e) => {
                dispatch(setField({ key: "hp", value: e.target.value }));
              }}
            />
          </Form.Group>
        </Row>

        <Row className="mb-2 gap-2">
          <Form.Group as={Col} className="p-0">
            <InputGroup>
              <Form.Control
                className="py-2"
                isInvalid={!placeData.price && isSubmitted}
                placeholder="Price"
                aria-label="Price"
                inputMode="numeric"
                maxLength={12}
                value={placeData.price || ""}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d*$/.test(input)) {
                    dispatch(
                      setField({
                        key: "price",
                        value: parseInt(e.target.value) || undefined,
                      })
                    );
                  }
                }}
              />
              <InputGroup.Text id="basic-addon1">
                {user?.city?.country.currency || (
                  <Spinner animation="border" role="status" size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                )}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} className="p-0">
            <Form.Select
              className="py-2"
              isInvalid={!placeData.condition_id && isSubmitted}
              value={placeData.condition_id || ""}
              onChange={(e) => {
                dispatch(
                  setField({ key: "condition_id", value: e.target.value })
                );
              }}
              aria-label="Condition"
            >
              <option value="">Condition</option>
              {conditions.map(({ id, title }) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-2 gap-2">
          <Form.Group as={Col} className="p-0">
            <Form.Control
              className="py-2"
              isInvalid={!placeData.mileage && isSubmitted}
              type="text"
              inputMode="numeric"
              placeholder="Mileage"
              aria-label="Mileage"
              maxLength={7}
              value={placeData.mileage || ""}
              onChange={(e) => {
                dispatch(
                  setField({ key: "mileage", value: parseInt(e.target.value) })
                );
              }}
            />
          </Form.Group>
        </Row>

        <Row className="mb-2 gap-2">
          <Form.Group as={Col} className="p-0">
            <InputGroup>
              <Form.Control
                className="py-2"
                placeholder="Contry"
                aria-label="Contry"
                disabled
                value={
                  countries.find(
                    (country) => country.id === user?.city.country.id
                  )?.title
                }
              />
              <InputGroup.Text>
                <Link
                  to="../account"
                  className="fs-12 link-underline-primary link-underline-opacity-0 mainText"
                >
                  Change
                </Link>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} className="p-0">
            <InputGroup>
              <Form.Control
                className="py-2"
                placeholder="Contry"
                aria-label="Contry"
                disabled
                value={
                  countries.find(
                    (country) => country.id === user?.city.country.id
                  )?.title
                }
              />
              <InputGroup.Text>
                <Link
                  to="../account"
                  className="fs-12 link-underline-primary link-underline-opacity-0 mainText"
                >
                  Change
                </Link>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Row>

        <Row className="my-4">
          <Form.Group as={Col} className="p-0">
            <Form.Check
              type="checkbox"
              label="Commercial transport"
              className="text-start defaultText d-flex align-items-center"
              checked={placeData.commercial}
              onChange={(e) => {
                dispatch(
                  setField({ key: "commercial", value: e.target.checked })
                );
              }}
            />
          </Form.Group>
        </Row>
        <Row className="mb-2 gap-2">
          <Form.Group as={Col} className="p-0">
            <Form.Control
              className="py-2"
              isInvalid={!placeData.description && isSubmitted}
              as="textarea"
              rows={4}
              value={placeData.description}
              placeholder="Description"
              onChange={(e) => {
                dispatch(
                  setField({
                    key: "description",
                    value: e.target.value,
                  })
                );
              }}
              maxLength={800}
            />
          </Form.Group>
        </Row>
      </Container>
    </Form>
};

export default EditDescription;

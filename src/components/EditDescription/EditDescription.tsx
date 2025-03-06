import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import WebApp from "@twa-dev/sdk";
import { Advertisement } from "../../interfaces/advertisement.interface";
import { AdvertisementDto } from "../../interfaces/dto/advertisement.dto";
import { Model } from "../../interfaces/vehicle-info.interface";
import { DataState } from "../../redux/slices/data-slice/data-slice";
import {
  descriptionSelector,
  setNewDecriptionField,
} from "../../redux/slices/description-slice/description-slice";
import { userSelector } from "../../redux/slices/user-slice/user-slice";
import { AppDispatch } from "../../redux/store";

import { fetchModels } from "../../utils/fetch-models";
import { generateYearsList } from "../../utils/generate-years-list";
import { updateAdvertisement } from "../../utils/update-advertsement";
import { useOverflowHidden } from "../../hooks/useOverflow";

interface EditDescriptionProps {
  data: DataState;
  advertisement: Advertisement;
}

const EditDescription = ({ data, advertisement }: EditDescriptionProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useOverflowHidden(false);
  const newDescription = useSelector(descriptionSelector);

  const modelMakeId = advertisement.model.make.id;

  const user = useSelector(userSelector);

  const { countries, makes, engineTypes, colors, conditions } = data;

  const years = useMemo(generateYearsList, []);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedMakeId, setSelectedMakeId] = useState<string | number>(
    modelMakeId
  );
  const [models, setModels] = useState<Model[]>([]);
  const [lockForm, setLockForm] = useState<boolean>(false);

  const isAdvertisementDataValid = useCallback(() => {
    const requiredFields: (keyof AdvertisementDto)[] = [
      "model_id",
      "engine_id",
      "color_id",
      "year",
      "hp",
      "price",
      "mileage",
      "condition_id",
      "description",
    ];

    if (user?.admin) {
      requiredFields.push("fict_phone");
    }

    const valid = requiredFields.every((field) => {
      const value = newDescription?.[field];
      return value !== undefined && value !== "" && !Number.isNaN(value);
    });

    return valid;
  }, [newDescription, user?.admin]);

  useEffect(() => {
    WebApp.MainButton.setText("Save");
    WebApp.MainButton.show();

    return () => {
      WebApp.MainButton.hide();
    };
  }, []);

  const submitAdvertisement = useCallback(async () => {
    setIsSubmitted(true);

    if (isAdvertisementDataValid()) {
      try {
        await updateAdvertisement(newDescription, advertisement.id);
        navigate(-1);
      } catch {
        WebApp.showAlert("Something wrong\nTry again later");
      }
    }
  }, [advertisement.id, isAdvertisementDataValid, navigate, newDescription]);

  useEffect(() => {
    WebApp.MainButton.offClick(submitAdvertisement);
    WebApp.MainButton.onClick(submitAdvertisement);

    return () => {
      WebApp.MainButton.offClick(submitAdvertisement);
    };
  }, [submitAdvertisement]);

  useEffect(() => {
    (async () => {
      setModels(await fetchModels(selectedMakeId));
    })();
  }, [selectedMakeId]);

  useEffect(() => {
    setSelectedMakeId(modelMakeId);
  }, [modelMakeId]);

  useEffect(() => {
    setTimeout(() => setLockForm(false), 500);
  }, [lockForm]);

  return (
    <Form className={`pb-5 ${lockForm ? "pe-none" : ""}`}>
      <Container>
        <Row className="mb-2 gap-2">
          <Form.Group as={Col} className="p-0" id="place-form">
            <Form.Select
              className="py-2"
              as={Col}
              aria-asdasd={selectedMakeId}
              isInvalid={!selectedMakeId && isSubmitted}
              value={selectedMakeId}
              onChange={(e) => {
                setLockForm(true);
                setSelectedMakeId(e.target.value);
                dispatch(
                  setNewDecriptionField({ key: "model_id", value: undefined })
                );
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
              isInvalid={!newDescription.model_id && isSubmitted}
              value={newDescription.model_id || ""}
              onChange={(e) => {
                setLockForm(true);
                dispatch(
                  setNewDecriptionField({
                    key: "model_id",
                    value: e.target.value,
                  })
                );
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
              isInvalid={!newDescription.engine_id && isSubmitted}
              value={newDescription.engine_id || ""}
              onChange={(e) => {
                setLockForm(true);
                dispatch(
                  setNewDecriptionField({
                    key: "engine_id",
                    value: e.target.value,
                  })
                );
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
              isInvalid={!newDescription.color_id && isSubmitted}
              value={newDescription.color_id || ""}
              onChange={(e) => {
                setLockForm(true);
                dispatch(
                  setNewDecriptionField({
                    key: "color_id",
                    value: e.target.value,
                  })
                );
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
              isInvalid={!newDescription.year && isSubmitted}
              value={newDescription.year || ""}
              onChange={(e) => {
                setLockForm(true);
                dispatch(
                  setNewDecriptionField({ key: "year", value: e.target.value })
                );
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
              isInvalid={!newDescription.hp && isSubmitted}
              type="text"
              inputMode="numeric"
              placeholder="Horse powers"
              aria-label="Horse powers"
              maxLength={4}
              value={newDescription.hp || ""}
              onChange={(e) => {
                dispatch(
                  setNewDecriptionField({ key: "hp", value: e.target.value })
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
                isInvalid={!newDescription.price && isSubmitted}
                placeholder="Price"
                aria-label="Price"
                inputMode="numeric"
                maxLength={12}
                value={newDescription.price || ""}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d*$/.test(input)) {
                    dispatch(
                      setNewDecriptionField({
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
              isInvalid={!newDescription.condition_id && isSubmitted}
              value={newDescription.condition_id || ""}
              onChange={(e) => {
                setLockForm(true);
                dispatch(
                  setNewDecriptionField({
                    key: "condition_id",
                    value: e.target.value,
                  })
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
              isInvalid={!newDescription.mileage && isSubmitted}
              type="text"
              inputMode="numeric"
              placeholder="Mileage"
              aria-label="Mileage"
              maxLength={7}
              value={newDescription.mileage || ""}
              onChange={(e) => {
                dispatch(
                  setNewDecriptionField({
                    key: "mileage",
                    value: parseInt(e.target.value),
                  })
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

        {user?.admin && (
          <Row className="mb-2 gap-2">
            <Form.Group as={Col} className="p-0">
              <Form.Control
                className="py-2"
                isInvalid={!newDescription.fict_phone && isSubmitted}
                type="text"
                inputMode="decimal"
                placeholder="Phone"
                aria-label="Phone"
                maxLength={15}
                value={newDescription.fict_phone || ""}
                onChange={(e) => {
                  const inputValue = e.target.value;

                  // Проверяем, начинается ли строка с "+" и содержит ли только цифры после него
                  if (/^\+?\d*$/.test(inputValue)) {
                    dispatch(
                      setNewDecriptionField({
                        key: "fict_phone",
                        value: inputValue, // Сохраняем как строку, чтобы сохранить "+"
                      })
                    );
                  }
                }}
              />
            </Form.Group>
          </Row>
        )}

        <Row className="my-4">
          <Form.Group as={Col} className="p-0">
            <Form.Check
              type="checkbox"
              label="Commercial transport"
              className="text-start defaultText d-flex align-items-center"
              checked={newDescription.commercial}
              onChange={(e) => {
                dispatch(
                  setNewDecriptionField({
                    key: "commercial",
                    value: e.target.checked,
                  })
                );
              }}
            />
          </Form.Group>
        </Row>
        <Row className="mb-2 gap-2">
          <Form.Group as={Col} className="p-0">
            <Form.Control
              className="py-2"
              isInvalid={!newDescription.description && isSubmitted}
              as="textarea"
              rows={4}
              value={newDescription.description}
              placeholder="Description"
              onChange={(e) => {
                dispatch(
                  setNewDecriptionField({
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
  );
};

export default EditDescription;

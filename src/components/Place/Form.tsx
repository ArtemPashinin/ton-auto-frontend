import { useCallback, useEffect, useMemo, useState } from "react";
import Form from "react-bootstrap/esm/Form";
import Stack from "react-bootstrap/esm/Stack";
import axios from "axios";
import { InputGroup, Spinner, Col, Row, Container } from "react-bootstrap";
import { Step, usePlaceContext } from "./PlaceContext";
import {
  Make,
  Model,
  EngineType,
  Condition,
  Color,
} from "../../interfaces/vehicle-info.interface";
import WebApp from "@twa-dev/sdk";

export const AdForm = () => {
  const {
    advertisementData,
    updateField,
    isAdvertisementDataValid,
    user,
    setStep,
  } = usePlaceContext();
  const [selectedMakeId, setSelectedMakeId] = useState<string>("");
  const [data, setData] = useState({
    makes: [] as Make[],
    models: [] as Model[],
    engineTypes: [] as EngineType[],
    colors: [] as Color[],
    conditions: [] as Condition[],
    description: "" as string,
  });
  const [, setError] = useState<string | null>(null);
  const [, setLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const fetchData = useCallback(
    async (endpoint: string, key: keyof typeof data) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/vehicle/${endpoint}`
        );
        setData((prev) => ({ ...prev, [key]: response.data }));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError(`Failed to fetch ${endpoint}. Try again later!`);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchModels = useCallback(async () => {
    if (selectedMakeId) {
      try {
        const response = await axios.get<Model[]>(
          `${import.meta.env.VITE_APP_API_URL}/vehicle/models/${selectedMakeId}`
        );
        setData((prev) => ({ ...prev, models: response.data }));
      } catch (error) {
        console.error("Failed to fetch models:", error);
        setError("Failed to fetch models. Try again later!");
      }
    }
  }, [selectedMakeId]);

  const submitAdvertisement = useCallback(() => {
    setIsSubmitted(true);

    if (isAdvertisementDataValid) {
      setStep(Step.MEDIA);
    }
  }, [isAdvertisementDataValid, setStep]);

  useEffect(() => {
    WebApp.MainButton.text = "Next";
    WebApp.MainButton.show();
    WebApp.MainButton.onClick(() => submitAdvertisement());

    return () => {
      WebApp.MainButton.offClick(() => submitAdvertisement()); // Очистка обработчика
      WebApp.MainButton.hide();
    };
  }, [submitAdvertisement]);

  useEffect(() => {
    fetchData("makes", "makes");
    fetchData("engineTypes", "engineTypes");
    fetchData("colors", "colors");
    fetchData("conditions", "conditions");
  }, [fetchData]);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from(
      { length: currentYear - 1960 + 1 },
      (_, i) => currentYear - i
    );
  }, []);

  return (
    <div className="p-2">
      <Form>
        <Container>
          {/* Make and Model */}
          <Row className="mb-2 gap-2">
            <Form.Group as={Col} className="p-0" id="place-form">
              <Form.Select
                className="py-2"
                as={Col}
                isInvalid={!selectedMakeId && isSubmitted}
                value={selectedMakeId || ""}
                onChange={(e) => {
                  setSelectedMakeId(e.target.value);
                  updateField("model_id", undefined);
                }}
                aria-label="Select make"
              >
                <option value="">Make</option>
                {data.makes.map(({ id, make }) => (
                  <option key={id} value={id}>
                    {make}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} className="p-0">
              <Form.Select
                className="py-2"
                isInvalid={!advertisementData.model_id && isSubmitted}
                value={advertisementData.model_id || ""}
                onChange={(e) => {
                  updateField("model_id", e.target.value);
                }}
                disabled={!selectedMakeId}
                aria-label="Select model"
              >
                <option value="">Model</option>
                {data.models.map(({ id, model }) => (
                  <option key={id} value={id}>
                    {model}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          {/* Engine and Color */}
          <Row className="mb-2 gap-2">
            <Form.Group as={Col} className="p-0">
              <Form.Select
                className="py-2"
                isInvalid={!advertisementData.engine_id && isSubmitted}
                value={advertisementData.engine_id || ""}
                onChange={(e) => {
                  updateField("engine_id", e.target.value);
                }}
                aria-label="Select engine type"
              >
                <option value="">Engine type</option>
                {data.engineTypes.map(({ id, type }) => (
                  <option key={id} value={id}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} className="p-0">
              <Form.Select
                className="py-2"
                isInvalid={!advertisementData.color_id && isSubmitted}
                value={advertisementData.color_id || ""}
                onChange={(e) => {
                  updateField("color_id", e.target.value);
                }}
                aria-label="Select color"
              >
                <option value="">Color</option>
                {data.colors.map(({ id, color }) => (
                  <option key={id} value={id}>
                    {color}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          {/* Year and Horse Powers */}
          <Row className="mb-2 gap-2">
            <Form.Group as={Col} className="p-0">
              <Form.Select
                className="py-2"
                isInvalid={!advertisementData.year && isSubmitted}
                value={advertisementData.year || ""}
                onChange={(e) => {
                  updateField("year", parseInt(e.target.value));
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
                isInvalid={!advertisementData.hp && isSubmitted}
                type="text"
                inputMode="numeric"
                placeholder="Horse powers"
                aria-label="Horse powers"
                maxLength={4}
                value={advertisementData.hp || ""}
                onChange={(e) => {
                  updateField("hp", parseInt(e.target.value) || undefined);
                }}
              />
            </Form.Group>
          </Row>

          {/* Price and Condition */}
          <Row className="mb-2 gap-2">
            <Form.Group as={Col} className="p-0">
              <InputGroup>
                <Form.Control
                  className="py-2"
                  isInvalid={!advertisementData.price && isSubmitted}
                  placeholder="Price"
                  aria-label="Price"
                  inputMode="numeric"
                  maxLength={12}
                  value={advertisementData.price || ""}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^\d*$/.test(input)) {
                      updateField(
                        "price",
                        parseInt(e.target.value) || undefined
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
                isInvalid={!advertisementData.condition_id && isSubmitted}
                value={advertisementData.condition_id || ""}
                onChange={(e) => {
                  updateField("condition_id", e.target.value);
                }}
                aria-label="Condition"
              >
                <option value="">Condition</option>
                {data.conditions.map(({ id, title }) => (
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
                isInvalid={!advertisementData.mileage && isSubmitted}
                type="text"
                inputMode="numeric"
                placeholder="Mileage"
                aria-label="Mileage"
                maxLength={7}
                value={advertisementData.mileage || ""}
                onChange={(e) => {
                  updateField("mileage", parseInt(e.target.value) || undefined);
                }}
              />
            </Form.Group>
          </Row>

          <Row className="my-4">
            <Form.Group as={Col} className="p-0">
              <Form.Check
                type="checkbox"
                label="Commercial transport"
                className="text-start defaultText d-flex align-items-center"
                checked={advertisementData.commercial}
                onChange={() => {
                  updateField("commercial", !advertisementData.commercial);
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-2 gap-2">
            <Form.Group as={Col} className="p-0">
              <Form.Control
                className="py-2"
                isInvalid={!advertisementData.description && isSubmitted}
                as="textarea"
                rows={4}
                value={advertisementData.description}
                placeholder="Description"
                onChange={(e) => {
                  updateField("description", e.target.value);
                }}
                maxLength={800}
              />
            </Form.Group>
          </Row>
        </Container>
        <Stack className="p-2 fixed-bottom pb-5"></Stack>
      </Form>
    </div>
  );
};

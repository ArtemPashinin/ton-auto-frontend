import {
  Form,
  Row,
  Col,
  InputGroup,
  Spinner,
  Container,
} from "react-bootstrap";
import { AdvertisementDto } from "../../interfaces/dto/advertisement.dto";
import WebApp from "@twa-dev/sdk";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  fetchVehicleData,
  VehicleEndpoint,
} from "../../utils/fetch-vehicle-data";
import { Advertisement } from "../../interfaces/advertisement.interface";
import {
  City,
  Color,
  Condition,
  Country,
  EngineType,
  Make,
  Model,
} from "../../interfaces/vehicle-info.interface";
import { fetchModels } from "../../utils/fetch-models";
import { updateAdvertisement } from "../../utils/update-advertsement";

interface Props {
  toggleIsOnEditDescription: (advertisementId?: string) => void;
}

interface SearchData {
  makes: Make[];
  models: Model[];
  engineTypes: EngineType[];
  colors: Color[];
  conditions: Condition[];
  cities: City[];
  countries: Country[];
  years: number[];
}

type EditFormProps = Props & Advertisement;

export const EditForm = ({
  id,
  model,
  engine,
  color,
  hp,
  year,
  price,
  user,
  condition,
  mileage,
  description,
  commercial,
  toggleIsOnEditDescription,
}: EditFormProps) => {
  const sendedRef = useRef<boolean>(false);

  const [updatedFields, setUpdatedFields] = useState<AdvertisementDto>({
    model_id: model.id,
    engine_id: engine.id,
    color_id: color.id,
    hp,
    year,
    price,
    user_id: user.id,
    condition_id: condition.id,
    mileage,
    description,
    commercial,
  });
  const updatedFieldsRef = useRef<AdvertisementDto>(updatedFields);
  const [selectedMakeId, setSelectedMakeId] = useState<string | number>(
    model.make.id
  );
  const [searchData, setSearchData] = useState<SearchData>({
    makes: [],
    models: [],
    engineTypes: [],
    countries: [],
    cities: [],
    colors: [],
    conditions: [],
    years: useMemo(() => {
      const currentYear = new Date().getFullYear();
      return Array.from(
        { length: currentYear - 1960 + 1 },
        (_, i) => currentYear - i
      );
    }, []),
  });

  const [correctFields, setCorrectFields] = useState<Record<string, boolean>>({
    make: true,
    model: true,
    hp: true,
    price: true,
    mileage: true,
    description: true,
  });
  const correctFieldsRef = useRef<Record<string, boolean>>(correctFields);

  const fetchData = useCallback(
    async (endpoint: VehicleEndpoint, key: keyof SearchData) => {
      try {
        const vehicleData = await fetchVehicleData(endpoint);
        setSearchData((prev) => ({ ...prev, [key]: vehicleData }));
      } catch (error) {
        console.error(`Error fetching ${key}:`, error);
      }
    },
    []
  );

  const updateModels = useCallback(async () => {
    if (selectedMakeId) {
      const models = await fetchModels(selectedMakeId);
      setSearchData((prev) => ({ ...prev, models }));
    }
  }, [selectedMakeId]);

  const cancel = useCallback(() => {
    toggleIsOnEditDescription();
    WebApp.MainButton.hide();
    WebApp.SecondaryButton.hide();
    WebApp.SecondaryButton.offClick(cancel);
    WebApp.MainButton.offClick(updateAd);
  }, [toggleIsOnEditDescription]);

  const updateAd = useCallback(async () => {
    console.log(correctFieldsRef.current);
    if (
      !sendedRef.current &&
      Object.values(correctFieldsRef.current).every((valid) => valid)
    ) {
      sendedRef.current = true;
      await updateAdvertisement(updatedFieldsRef.current, id);
      cancel();
    }
  }, [cancel, id]);

  const toggleButtons = useCallback(() => {
    WebApp.MainButton.offClick(updateAd);
    WebApp.SecondaryButton.offClick(cancel);

    WebApp.MainButton.show();
    WebApp.MainButton.setText("Save");
    WebApp.MainButton.onClick(updateAd);
    WebApp.SecondaryButton.show();
    WebApp.SecondaryButton.onClick(cancel);
  }, [cancel, updateAd]);

  const setCorrectField = (field: string, value: string | number | boolean) => {
    setCorrectFields((prev) => ({
      ...prev,
      [field]: Boolean(value),
    }));
  };

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    if (field === "commercial") setCorrectField(field, true);
    else setCorrectField(field, value);
    setUpdatedFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    toggleButtons();
    fetchData("makes", "makes");
    fetchData("engineTypes", "engineTypes");
    fetchData("colors", "colors");
    fetchData("conditions", "conditions");
  }, [fetchData, toggleButtons]);

  useEffect(() => {
    updateModels();
  }, [updateModels]);

  useEffect(() => {
    updatedFieldsRef.current = updatedFields;
  }, [updatedFields]);

  useEffect(() => {
    correctFieldsRef.current = correctFields;
  }, [correctFields]);

  return (
    <Container>
      <Row className="mb-2 gap-2">
        {/* Make and Model */}
        <Form.Group as={Col} className="p-0">
          <Form.Select
            className={correctFields.make ? "" : "incorrect-form-select"}
            value={selectedMakeId}
            onChange={(event) => {
              const selectedMake = event.target.value;
              setSelectedMakeId(selectedMake);
              setCorrectField("make", selectedMake);
              setCorrectField("model", "");
              setUpdatedFields((prev) => ({
                ...prev,
                model_id: "",
              }));
            }}
          >
            <option value="">Make</option>
            {searchData.makes.map(({ id, make }) => (
              <option key={id} value={id}>
                {make}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} className="p-0">
          <Form.Select
            className={correctFields.model ? "" : "incorrect-form-select"}
            disabled={!selectedMakeId}
            value={updatedFields.model_id}
            onChange={(event) => {
              const selectedModel = event.target.value;
              setCorrectField("model", selectedModel);
              setUpdatedFields((prev) => ({
                ...prev,
                model_id: selectedModel,
              }));
            }}
          >
            <option value="">Model</option>
            {searchData.models.map(({ id, model }) => (
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
            value={updatedFields.engine_id}
            onChange={(e) => handleInputChange("engine_id", e.target.value)}
          >
            {searchData.engineTypes.map(({ id, type }) => (
              <option key={id} value={id}>
                {type}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} className="p-0">
          <Form.Select
            value={updatedFields.color_id}
            onChange={(e) => handleInputChange("color_id", e.target.value)}
          >
            {searchData.colors.map(({ id, color }) => (
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
            value={updatedFields.year}
            onChange={(e) => handleInputChange("year", e.target.value)}
          >
            {searchData.years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} className="p-0">
          <Form.Control
            className={correctFields.hp ? "" : "incorrect-form-select"}
            value={updatedFields.hp}
            type="text"
            placeholder="Horse powers"
            onChange={(e) =>
              handleInputChange("hp", parseInt(e.target.value) || "")
            }
          />
        </Form.Group>
      </Row>

      <Row className="mb-2 gap-2">
        <Form.Group as={Col} className="p-0">
          <InputGroup>
            <Form.Control
              className={correctFields.price ? "" : "incorrect-form-select"}
              value={updatedFields.price}
              placeholder="Price"
              onChange={(e) =>
                handleInputChange("price", parseInt(e.target.value) || "")
              }
            />
            <InputGroup.Text>
              {user.city.country.currency || (
                <Spinner animation="border" size="sm" />
              )}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} className="p-0">
          <Form.Select
            value={updatedFields.condition_id}
            onChange={(e) => handleInputChange("condition_id", e.target.value)}
          >
            {searchData.conditions.map(({ id, title }) => (
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
            className={correctFields.mileage ? "" : "incorrect-form-select"}
            value={updatedFields.mileage}
            type="text"
            placeholder="Mileage"
            onChange={(e) =>
              handleInputChange("mileage", parseInt(e.target.value) || "")
            }
          />
        </Form.Group>
      </Row>
      <Row className="mb-2">
        <Form.Group as={Col} className="p-0">
          <Form.Check
            type="checkbox"
            label="Commercial transport"
            className="text-start defaultText"
            checked={updatedFields.commercial}
            onChange={() => {
              handleInputChange("commercial", !updatedFields.commercial);
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mb-2 gap-2">
        <Form.Group as={Col} className="p-0">
          <Form.Control
            className={correctFields.description ? "" : "incorrect-form-select"}
            value={updatedFields.description}
            placeholder="Description"
            onChange={(e) => handleInputChange("description", e.target.value)}
            as="textarea"
            rows={3}
          />
        </Form.Group>
      </Row>
    </Container>
  );
};

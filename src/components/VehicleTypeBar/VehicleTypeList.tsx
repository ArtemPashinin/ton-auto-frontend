import { Container, Row } from "react-bootstrap";
import { VehicleTypeButton } from "../buttons/VehicleTypeButton/VehicleTypeButton";
import { vehicleTypeButtonData } from "../../enums/vehicle-types";

export const VehicleTypeList = () => {
  return (
    <Container className="mb-3">
      <Row>
        {vehicleTypeButtonData.map((data, index) => (
          <VehicleTypeButton {...data} key={index} />
        ))}
      </Row>
    </Container>
  );
};

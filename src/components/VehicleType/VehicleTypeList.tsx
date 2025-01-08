import { Container, Row } from "react-bootstrap";
import { VehicleType } from "../../enums/VehicleType.enum";
import { vehicleTypeButtonData } from "../../enums/VehicleTypeButtonData.enum";
import { VehicleTypeButton } from "./VehicleTypeButton";

export interface VehicleTypeListProps {
  onVehicleTypeChange: (vehicleType: VehicleType) => void;
  activeVehicleType: VehicleType;
}

export const VehicleTypeList = ({
  onVehicleTypeChange,
  activeVehicleType,
}: VehicleTypeListProps) => {
  return (
    <Container className="mb-3">
      <Row>
        {vehicleTypeButtonData.map(({ title, type }, index) => (
          <VehicleTypeButton
            onClick={() => {
              onVehicleTypeChange(type);
            }}
            title={title}
            isACtive={activeVehicleType === type}
            key={index}
          />
        ))}
      </Row>
    </Container>
  );
};
